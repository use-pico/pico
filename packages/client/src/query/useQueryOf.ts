"use client";

import type {
    FilterSchema,
    OrderBySchema,
    QuerySchema
}                    from "@use-pico/common";
import {useStore}    from "../store/useStore";
import {IQueryStore} from "./IQueryStore";

/**
 * Direct access to a query of the provided source.
 *
 * @template TQuerySchema Shape of the query itself.
 */
export namespace useQueryStore {
    /**
     * Props for the `useQueryStore` hook.
     */
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        /**
         * Query store used by this hook.
         */
        store: IQueryStore.Store<TQuerySchema>;
    }
}

export const useQueryOf = <
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        store
    }: useQueryStore.Props<TQuerySchema>
) => {
    return useStore(store, (
        {
            filter,
            where,
            orderBy,
            cursor
        }) => ({
        filter,
        where,
        orderBy,
        cursor
    }));
};
