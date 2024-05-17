import {
    cleanOf,
    CursorSchema,
    type FilterSchema,
    isEmpty,
    type OrderBySchema,
    type QuerySchema
}                    from "@use-pico2/common";
import {createStore} from "../store/createStore";
import {IQueryStore} from "./IQueryStore";

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
                    cursor: CursorSchema.parse({
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
                set({filter: schema.shape.filter.parse(filter)});
            },
            shallowFilter:  filter => {
                set({
                    filter: schema.shape.filter.parse({
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
                set({orderBy: schema.shape.orderBy.parse(orderBy)});
            },
            shallowOrderBy: orderBy => {
                set({
                    orderBy: schema.shape.orderBy.parse({
                        ...get().orderBy,
                        ...orderBy,
                    }),
                });
            },
            ...values,
        }),
    });
};
