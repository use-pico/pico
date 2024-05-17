"use client";

import type {
    CountSchema,
    FilterSchema,
    OrderBySchema,
    QuerySchema,
    WithIdentitySchema
}                              from "@use-pico2/common";
import {useStore}              from "../store/useStore";
import {IQueryStore}           from "./IQueryStore";
import {IWithQuery}            from "./IWithQuery";
import type {IWithSourceQuery} from "./IWithSourceQuery";
import {useQueryEx}            from "./useQueryEx";

export namespace useCount {
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TSchema extends WithIdentitySchema,
    > extends IWithQuery.QueryOptions<CountSchema> {
        store: IQueryStore.Store<TQuerySchema>;
        withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
    }
}

export const useCount = <
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TSchema extends WithIdentitySchema,
>(
    {
        store,
        withSourceQuery: {
                             withCountQuery
                         },
        ...              options
    }: useCount.Props<TQuerySchema, TSchema>
) => {
    return useQueryEx({
        withQuery: withCountQuery,
        request:   useStore(store, (
            {
                where,
                filter,
            }) => ({
            where,
            filter,
            cursor:  undefined,
            orderBy: undefined,
        })),
        options,
    });
};
