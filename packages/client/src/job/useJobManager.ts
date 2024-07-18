import type { UseQueryResult } from "@tanstack/react-query";
import type {
	JobMutationSchema,
	JobQuerySchema,
	JobSchema,
	RequestSchema,
	ResponseSchema,
	WithIdentitySchema,
} from "@use-pico/common";
import { useRef } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { t } from "../i18n/t";
import { td } from "../i18n/td";
import type { IWithMutation } from "../query/IWithMutation";
import type { IWithSourceQuery } from "../query/IWithSourceQuery";
import { useMutation } from "../query/useMutation";
import { useQueryEx } from "../query/useQueryEx";
import { useIdentity } from "../ticket/useIdentity";
import type { IWithAsync } from "./IWithAsync";

export namespace useJobManager {
	/**
	 * Props for the `useJob` hook.
	 *
	 * @template TRequestSchema Actual request used to execute the job.
	 * @template TResponseSchema When a job finishes, it must be validated against this schema to get it's (success) result.
	 */
	export interface Props<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> {
		/**
		 * Mutation used to execute the job. The mutation must be asynchronous or this function will "block".
		 */
		withAsync: IWithAsync<TRequestSchema>;
		/**
		 * Mutation used to interrupt a job.
		 */
		withInterrupt: IWithMutation<WithIdentitySchema, JobSchema>;
		/**
		 * Mutation on the job.
		 */
		withMutation: IWithMutation<JobMutationSchema, JobSchema>;
		/***
		 * Query providing the job.
		 */
		withQuery: IWithSourceQuery<JobQuerySchema, JobSchema>;
		/**
		 * Expected response schema.
		 *
		 * If you don't care about the response, use {@see VoidSchema}.
		 */
		schema: TResponseSchema;
		/**
		 * How often should the job be refreshed (in milliseconds).
		 */
		refresh?: number;
	}

	export type OnStatusSuccess<TResponseSchema extends ResponseSchema> =
		(props: {
			response: z.infer<TResponseSchema>;
			job: JobSchema.Type;
		}) => void;

	export type OnStatusCheck = (props: { job: JobSchema.Type }) => void;

	export interface JobManager<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> {
		/**
		 * Low level access to query result of the job fetch. Keep in mind a job data is an array.
		 */
		job: UseQueryResult<z.infer<TResponseSchema>>;
		/**
		 * Prepares `start` function for the job, because it internally uses `useMutation`, so this
		 * function must be hook too.
		 */
		useStart(): {
			mutation: {
				isPending: boolean;
			};
			start(request: z.infer<TRequestSchema>): void;
		};
		/**
		 * Generates interrupt handler for the job.
		 */
		useInterrupt(): {
			mutation: {
				isPending: boolean;
			};
			interrupt(): void;
		};
		/**
		 * Brute force job deletion.
		 */
		useDelete(): {
			mutation: {
				isPending: boolean;
			};
			delete(): void;
		};
		/**
		 * Watch job for changes. For status changes, see `useStatus`.
		 */
		useJob(): JobSchema.Type | undefined;
		/**
		 * Watch for job response.
		 */
		useResponse(): {
			isRunning: boolean;
			response: z.infer<TResponseSchema> | undefined;
		};
		/**
		 * Watch for job status changes.
		 */
		useStatus(): {
			status: number | undefined;
			change: boolean;
		};
		/**
		 * When watching a job, this function will be called when the job is finished and the response is valid.
		 *
		 * Called exactly once and exactly when job changes it's status to `3` (finished) on the page; when page is reloaded, this
		 * hook is not triggered.
		 */
		useStatusSuccess(callback: OnStatusSuccess<TResponseSchema>): void;
		/**
		 * Executed if the job ends with "check" status.
		 */
		useStatusCheck(callback: OnStatusCheck): void;
		/**
		 * Checks if the job is running (include initial job query loading (fetch) state).
		 */
		useIsRunning(): boolean;
	}
}

/**
 * Hooks used to control job execution, it's progress and the flow (start/stop/interrupt/...).
 *
 * Be careful as this hook `will` cause a lot of re-renders, so put it as low as possible in a component tree.
 *
 * It's safe to call it multiple times with the same parameters as everything is deduped at the end.
 *
 * @group hooks
 */

export const useJobManager = <
	TRequestSchema extends RequestSchema,
	TResponseSchema extends ResponseSchema,
>({
	withAsync,
	withMutation,
	withInterrupt,
	withQuery,
	schema,
	refresh = 1500,
}: useJobManager.Props<
	TRequestSchema,
	TResponseSchema
>): useJobManager.JobManager<TRequestSchema, TResponseSchema> => {
	const userId = useIdentity();
	const service = withAsync.key.join(".");
	const job = useQueryEx({
		withQuery,
		request: {
			where: {
				service,
				userId,
			},
		},
		options: {
			refetchInterval: refresh,
		},
	});
	const useJob = () => (job.isSuccess ? job.data?.[0] : undefined);
	const useStatus = () => {
		const status = useJob()?.status;
		const statusRef = useRef<number | undefined>(undefined);
		if (status !== undefined && statusRef.current !== undefined) {
			const change = statusRef.current !== status;
			statusRef.current = status;
			return {
				status,
				change,
			};
		}
		statusRef.current = status;
		return {
			status,
			change: false,
		};
	};
	const useIsRunning = () => {
		const { status } = useStatus();
		if (status === undefined) {
			return job.isLoading;
		}
		return [0, 1, 2].includes(status);
	};

	return {
		/**
		 * Exposes current job results.
		 */
		job,
		/**
		 * Gets current job if available.
		 */
		useJob,
		useStatus,
		useResponse: () => {
			const isRunning = useIsRunning();
			const job = useJob();
			return isRunning ?
					{
						isRunning: true,
						response: undefined,
					}
				:	{
						isRunning: false,
						response: schema.safeParse(job?.response).data,
					};
		},
		useStatusSuccess: (
			callback: useJobManager.OnStatusSuccess<TResponseSchema>,
		) => {
			const { status, change } = useStatus();
			if (!change) {
				return;
			}
			const $job = job.data?.[0];
			switch (status) {
				case 3:
					if ($job) {
						const response = schema.safeParse($job.response);
						if (response.success) {
							callback({
								response: response.data,
								job: $job,
							});
						}
						if (!response.success) {
							console.error(
								"Job: Response validation failed.",
								response.error.errors,
							);
						}
					}
					break;
				case 6:
					console.warn($job?.response);
					toast.warning(td()(`Check job [${$job?.service}] (toast)`), {
						id: $job?.id,
					});
					break;
				case 4:
					console.error($job?.response);
					toast.error(td()(`Job [${$job?.service}] failed (toast)`), {
						id: $job?.id,
					});
					break;
			}
		},
		useStatusCheck: (callback) => {
			const { status, change } = useStatus();
			if (!change) {
				return;
			}
			const $job = job.data?.[0];
			switch (status) {
				case 6:
					$job &&
						callback({
							job: $job,
						});
					break;
			}
		},
		/**
		 * Start the job (execute job mutation).
		 */
		useStart: () => {
			const mutation = useMutation({
				withMutation: withAsync,
			});
			return {
				/**
				 * This is a little trick: expose only some parts of the mutation to prevent misuse.
				 */
				mutation: mutation satisfies {
					isPending: boolean;
				},
				start: (request) => {
					mutation.mutate(request, {
						onError: () => {
							toast.error(t()`Job failed to start (toast)`);
						},
						onSuccess: () => {
							toast.success(t()`Job successfully started (toast)`);
						},
					});
				},
			};
		},
		useInterrupt: () => {
			const mutation = useMutation({
				withMutation: withInterrupt,
			});
			return {
				mutation,
				interrupt: () => {
					if (job.data?.[0]) {
						mutation.mutate({ id: job.data[0].id });
					}
				},
			};
		},
		useDelete: () => {
			const mutation = useMutation({
				withMutation,
			});
			return {
				mutation,
				delete: () => {
					if (job.data?.[0]) {
						mutation.mutate(
							{
								delete: {
									where: {
										service,
										userId,
									},
								},
							},
							{
								onSuccess: () => {
									toast.success(t()`Job successfully deleted (toast)`);
								},
							},
						);
					}
				},
			};
		},
		useIsRunning,
	};
};
