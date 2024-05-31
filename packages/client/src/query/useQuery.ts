import {
	useQuery as useCoolQuery,
	type UseQueryResult
}                   from "@tanstack/react-query";
import type {
	RequestSchema,
	ResponseSchema
}                   from "@use-pico/common";
import {type z}     from "zod";
import {IWithQuery} from "./IWithQuery";
import {usePromise} from "./usePromise";

export namespace useQuery {
	export interface Props<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> extends IWithQuery.QueryOptions<TResponseSchema> {
		withQuery: IWithQuery<TRequestSchema, TResponseSchema>;
	}

	export type Result<
		TResponseSchema extends ResponseSchema,
	> = UseQueryResult<
		z.infer<TResponseSchema>,
		any
	>;
}

/**
 * Wrapper around "native" react-query `useQuery` hook using schemas for request/response, thus validating everything coming in and out.
 *
 * @category query
 * @source
 */
export const useQuery = <
	TRequestSchema extends RequestSchema,
	TResponseSchema extends ResponseSchema,
>(
	{
		withQuery,
		queryKey: $queryKey,
		...options
	}: useQuery.Props<TRequestSchema, TResponseSchema>
): useQuery.Result<TResponseSchema> => {
	const promise = usePromise({withQuery});
	return useCoolQuery({
		queryKey: withQuery.key.concat($queryKey || []),
		queryFn: async () => promise({}),
		...options,
	});
};
