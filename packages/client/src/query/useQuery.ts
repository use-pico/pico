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

/**
 * Wrapper around "native" react-query `useQuery` hook using schemas for request/response, thus validating everything coming in and out.
 *
 * @group query
 *
 * @remarks
 * Wrapper around `useQuery` hook from `react-query` library. It uses schemas for request/response, thus validating everything coming in and out.
 *
 * This method is the core hook for fetching data using queries. Query is executed without any other dependencies (like {@link useSourceQuery} does).
 *
 * If you need access to low-level config of the query, use {@link useQueryEx} instead.
 *
 * @see {@link useQueryEx}
 * @see {@link useSourceQuery}
 */
export namespace useQuery {
    /**
     * Props for the `useQuery` hook.
     *
     * @template TRequestSchema Query request schema.
     * @template TResponseSchema Query response schema.
     */
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > extends IWithQuery.QueryOptions<TResponseSchema> {
        /**
         * Query used to fetch data.
         */
        withQuery: IWithQuery<TRequestSchema, TResponseSchema>;
    }

    /**
     * Result of the `useQuery` hook.
     *
     * @template TResponseSchema Query response schema.
     */
    export type Result<
        TResponseSchema extends ResponseSchema,
    > = UseQueryResult<
        z.infer<TResponseSchema>,
        any
    >;
}

export const useQuery = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    {
        withQuery,
        queryKey: $queryKey,
        ...       options
    }: useQuery.Props<TRequestSchema, TResponseSchema>
): useQuery.Result<TResponseSchema> => {
    const promise = usePromise({withQuery});
    return useCoolQuery({
        queryKey: withQuery.key.concat($queryKey || []),
        queryFn:  async () => promise({}),
        ...options,
    });
};
