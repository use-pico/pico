import {
	ErrorSchema,
	RpcBulkRequestSchema,
	RpcBulkResponseSchema,
	RpcRequestSchema,
	generateId,
	type RequestSchema,
	type ResponseSchema,
} from "@use-pico/common";
import axios, { type AxiosResponse } from "axios";
import { z } from "zod";
import { type IStore } from "../store/IStore";
import { withTimeout } from "../toolbox/withTimeout";
import { type RpcStore } from "./RpcStore";
import { isData } from "./isData";
import { isError } from "./isError";

const WITH_BULK_TIMEOUT = 50;

export namespace withBulk {
	export interface Props<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> {
		schema?: TResponseSchema;
		store: IStore.Props<RpcStore.Store>;
		service: string;
		request: z.infer<TRequestSchema>;
		/**
		 * Timeout in secs before current bulk is rejected
		 */
		timeout?: number;
	}
}

export const withBulk = async <
	TRequestSchema extends RequestSchema,
	TResponseSchema extends ResponseSchema,
>({
	schema,
	store: { bulkRef, bulkTimerRef, timeoutRef, url },
	service,
	request: data,
	timeout = WITH_BULK_TIMEOUT,
}: withBulk.Props<TRequestSchema, TResponseSchema>) => {
	return new Promise<z.infer<TResponseSchema>>((resolve, reject) => {
		bulkRef.current.set(generateId(), {
			schema,
			reject,
			resolve,
			request: {
				service,
				data,
			},
		});
		const $currentBulk = new Map(bulkRef.current);

		const guardianOfGalaxy = () => {
			if ($currentBulk.size) {
				console.warn("Bulk timeout", [...$currentBulk.entries()]);
			}
			$currentBulk.forEach(({ reject }) => {
				reject({
					error: {
						message: "Bulk timeout reached.",
						code: 408,
					},
				} satisfies ErrorSchema.Type);
			});
		};

		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(guardianOfGalaxy, timeout * 1000);

		withTimeout({
			timeout: 20,
			timerRef: bulkTimerRef,
			callback: async () => {
				$currentBulk.forEach((_, id) => bulkRef.current.delete(id));
				return axios
					.post<
						RpcBulkResponseSchema.Type,
						AxiosResponse<RpcBulkResponseSchema.Type>,
						RpcBulkRequestSchema.Type
					>(
						url,
						{
							bulk: [...$currentBulk.entries()].reduce(
								(bulk, [id, { request }]) => {
									bulk[id] = request;
									return bulk;
								},
								{} as Record<string, RpcRequestSchema.Type>,
							),
						},
						{
							baseURL: "",
						},
					)
					.then(({ data }) => {
						const { bulk } = RpcBulkResponseSchema.parse(data);
						$currentBulk.forEach(({ schema, reject, resolve }, id) => {
							try {
								const data = bulk?.[id];
								if (data === null || isData(data)) {
									resolve(
										schema ? schema.parse(data?.data) : data?.data || null,
									);
								} else if (isError(data)) {
									reject(data);
								} else {
									reject({
										error: {
											message:
												"Cannot parse returned data or data is incomplete",
											code: 400,
										},
									} satisfies ErrorSchema.Type);
								}
							} catch (e) {
								console.error(e instanceof z.ZodError ? e.errors : e);
								reject({
									error: {
										message: "General unhandled (client-side) error",
										code: 500,
									},
								} satisfies ErrorSchema.Type);
							}
							$currentBulk.delete(id);
						});
					})
					.catch((e) => {
						console.error(e);
						$currentBulk.forEach(({ reject }) => reject(e));
					})
					.finally(() => {
						/**
						 * Who remains will be in the timeout queue again; if nothing gets processed, we'll get proper timeouts.
						 *
						 * At least I hope.
						 */
						setTimeout(guardianOfGalaxy, timeout * 1000);
					});
			},
		});
	});
};
