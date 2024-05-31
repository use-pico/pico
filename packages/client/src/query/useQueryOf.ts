"use client";

import type {FilterSchema, OrderBySchema, QuerySchema} from "@use-pico/common";
import {useStore} from "../store/useStore";
import {IQueryStore} from "./IQueryStore";

export namespace useQueryStore {
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        store: IQueryStore.Store<TQuerySchema>;
    }
}
/**
 * Direct access to a query of the provided source.
 *
 * @template TQuerySchema Shape of the query itself.
 *
 * @param {useQueryStore.Props} props Extracts query
 */
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
