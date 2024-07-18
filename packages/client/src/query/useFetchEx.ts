import {useQuery}        from "@tanstack/react-query";
import type {
	RequestSchema,
	ResponseSchema
}                        from "@use-pico/common";
import {z}               from "zod";
import {IWithQuery}      from "./IWithQuery";
import {useFetchPromise} from "./useFetchPromise";

export namespace useFetchEx {
	export interface Props<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> extends IWithQuery.Options<TRequestSchema, TResponseSchema> {
		withQuery: IWithQuery<TRequestSchema, z.ZodArray<TResponseSchema>>;
	}
}

export const useFetchEx = <
	TRequestSchema extends RequestSchema,
	TResponseSchema extends ResponseSchema,
>(
	{
		withQuery,
		request,
		options: {
					 queryKey,
					 ...options
				 } = {}
	}: useFetchEx.Props<TRequestSchema, TResponseSchema>
) => {
	const promise = useFetchPromise({withQuery});
	return useQuery({
		queryKey: withQuery.key.concat("fetch", queryKey || [], request),
		queryFn:  async () => await promise(request) ?? await Promise.reject(new Error("No data")),
		retry:    false,
		...options,
	});
};
