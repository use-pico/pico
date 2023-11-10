"use client";

import {parse}              from "@use-pico/schema";
import {createStore}        from "@use-pico/store";
import {
    cleanOf,
    isEmpty
}                           from "@use-pico/utils";
import {type IQueryStore}   from "../api/IQueryStore";
import {CursorSchema}       from "../schema/CursorSchema";
import {type FilterSchema}  from "../schema/FilterSchema";
import {type OrderBySchema} from "../schema/OrderBySchema";
import {type QuerySchema}   from "../schema/QuerySchema";

export namespace createQueryStore {
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        name?: string;
        schema: TQuerySchema;
    }
}

export const createQueryStore = <
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        name,
        schema,
    }: createQueryStore.Props<TQuerySchema>
): IQueryStore.Store<TQuerySchema> => {
    return createStore<IQueryStore<TQuerySchema>>({
        name,
        factory: values => (set, get) => ({
            schema,
            cursor:         {
                page: 0,
                size: 30,
            },
            hasWhere:       () => {
                const where = get().where;
                if (!where) {
                    return false;
                }
                return !isEmpty(where);
            },
            hasFilter:      () => {
                const filter = get().filter;
                if (!filter) {
                    return false;
                }
                return !isEmpty(filter);
            },
            setCursor:      (page, size) => {
                set({
                    cursor: parse(CursorSchema, {
                        page,
                        size: size || get().cursor?.size || 30,
                    }),
                });
            },
            setSize:        size => {
                set({
                    cursor: {
                        page: 0,
                        size,
                    },
                });
            },
            setFilter:      filter => {
                set({filter: parse(schema.shape.filter, filter)});
            },
            shallowFilter:  filter => {
                set({
                    filter: parse(schema.shape.filter, {
                        ...get().filter,
                        ...filter,
                    }),
                });
            },
            clearFilter:    () => {
                set({
                    filter: undefined,
                });
            },
            isFilter:       () => {
                return !isEmpty(cleanOf(get().filter));
            },
            setOrderBy:     orderBy => {
                set({orderBy: parse(schema.shape.orderBy, orderBy)});
            },
            shallowOrderBy: orderBy => {
                set({
                    orderBy: parse(schema.shape.orderBy, {
                        ...get().orderBy,
                        ...orderBy,
                    }),
                });
            },
            ...values,
        }),
    });
};
