import {parse}                 from "@use-pico/schema";
import {createStore}           from "@use-pico/store";
import {
    cleanOf,
    isEmpty
}                              from "@use-pico/utils";
import {type IQueryStore}      from "../api/IQueryStore";
import {type IQueryStoreProps} from "../api/IQueryStoreProps";
import {CursorSchema}          from "../schema/CursorSchema";
import {type FilterSchema}     from "../schema/FilterSchema";
import {type OrderBySchema}    from "../schema/OrderBySchema";

export namespace createQueryStore {
    export interface Props<
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        name: string;
        schema: {
            filter: TFilterSchema;
            orderBy: TOrderBySchema;
        };
    }
}

export const createQueryStore = <
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>(
    {
        name,
        schema,
    }: createQueryStore.Props<TFilterSchema, TOrderBySchema>
): IQueryStore<TFilterSchema, TOrderBySchema> => {
    return createStore<IQueryStoreProps<TFilterSchema, TOrderBySchema>>({
        state: () => (set, get) => ({
            schema,
            where:          undefined,
            filter:         undefined,
            orderBy:        undefined,
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
                        size: size || get().cursor.size,
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
                set({filter: parse(schema.filter, filter)});
            },
            shallowFilter:  filter => {
                set({
                    filter: parse(schema.filter, {
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
                set({orderBy: parse(schema.orderBy, orderBy)});
            },
            shallowOrderBy: orderBy => {
                set({
                    orderBy: parse(schema.orderBy, {
                        ...get().orderBy,
                        ...orderBy,
                    }),
                });
            },
        }),
        name,
    });
};
