import type {
	RequestSchema,
	ResponseSchema
}                   from "@use-pico/common";
import {z}          from "zod";
import {IWithQuery} from "./IWithQuery";

export namespace useFetchPromise {
	export interface Props<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> {
		withQuery: IWithQuery<TRequestSchema, z.ZodArray<TResponseSchema>>;
	}

	export type Callback<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> = (request: z.infer<TRequestSchema>) => Promise<z.infer<TResponseSchema>>;

	export type Result<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> = Callback<TRequestSchema, TResponseSchema>;
}

export const useFetchPromise = <
	TRequestSchema extends RequestSchema,
	TResponseSchema extends ResponseSchema,
>(
	{
		withQuery: {
					   useCallback,
					   schema
				   },
	}: useFetchPromise.Props<TRequestSchema, TResponseSchema>
): useFetchPromise.Result<TRequestSchema, TResponseSchema> => {
	const callback = useCallback();
	return async request => {
		return (await callback({
			...schema.request.parse(request),
			cursor: {
				page: 0,
				size: 1,
			},
		}))?.[0];
	};
};
