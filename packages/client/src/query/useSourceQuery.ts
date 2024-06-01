"use client";

import {useQuery as useCoolQuery} from "@tanstack/react-query";
import type {
    FilterSchema,
    OrderBySchema,
    QuerySchema,
    WithIdentitySchema
}                                 from "@use-pico/common";
import {type z}                   from "zod";
import {IQueryStore}              from "./IQueryStore";
import {IWithQuery}               from "./IWithQuery";
import type {IWithSourceQuery}    from "./IWithSourceQuery";
import {usePromise}               from "./usePromise";
import {useQueryOf}               from "./useQueryOf";

/**
 * This hook is used to fetch data from the query connected to Query Store.
 *
 * @group hooks
 *
 * @remarks
 * When you have Query Store provider, this hook connects to it, so you'll get data driven by the store.
 *
 * @see {@link useQuery}
 * @see {@link useQueryEx}
 *
 * @example
 * ```tsx
 * import {useSourceQuery} from "@use-pico/client";
 *
 * export const MyQueryComponent = () => {
 *    return <QueryStoreProvider
 *      values={{
 *          filter: {name: "John"},
 *      }}
 *    >
 *        <MyComponent/>
 *    <QueryStoreProvider/>
 * }
 *
 * export const MyComponent = () => {
 *     // This will fetch data from query, using filter specified by QueryStoreProvider.
 *     const result = useSourceQuery({
 *          store: QueryStoreProvider,
 *     });
 * }
 * ```
 *
 * @see {@link createQueryStore}
 */
export namespace useSourceQuery {
    /**
     * Props for the `useSourceQuery` hook.
     *
     * @template TQuerySchema Query schema.
     * @template TResponseSchema Response schema.
     */
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TResponseSchema extends WithIdentitySchema,
    > extends IWithQuery.QueryOptions<z.ZodArray<TResponseSchema>> {
        /**
         * Query store used by this hook
         */
        store: IQueryStore.Store<TQuerySchema>;
        /**
         * Query used to fetch data.
         */
        withSourceQuery: IWithSourceQuery<TQuerySchema, TResponseSchema>;
    }
}

export const useSourceQuery = <
    TQuerySchema extends QuerySchema<any, any>,
    TResponseSchema extends WithIdentitySchema,
>(
    {
        store,
        withSourceQuery,
        queryKey,
        ...options
    }: useSourceQuery.Props<TQuerySchema, TResponseSchema>
): IWithSourceQuery.Result<TResponseSchema> => {
    const promise = usePromise({withQuery: withSourceQuery});
    const query = useQueryOf({store});

    return useCoolQuery({
        queryKey: withSourceQuery.key.concat(queryKey || []).concat(query),
        queryFn:  async () => promise(query),
        ...options,
    });
};
