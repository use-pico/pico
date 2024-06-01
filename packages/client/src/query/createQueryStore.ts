import {
    cleanOf,
    CursorSchema,
    type FilterSchema,
    isEmpty,
    type OrderBySchema,
    type QuerySchema
}                    from "@use-pico/common";
import {createStore} from "../store/createStore";
import {IQueryStore} from "./IQueryStore";

/**
 * Creates a Query Store.
 *
 * @group query
 *
 * @remarks
 * This is factory method for Query Stores used to provide context for Queries used to fetch data.
 *
 * @example
 * Create a Query Store:
 * ```tsx
 * import {createQueryStore} from "@use-pico/client";
 *
 * export const MyQueryStore = createQueryStore({});
 * ```
 *
 * @example
 * Provide Query Store to the component:
 * ```tsx
 * import {MyQueryStore} from "./MyQueryStore";
 *
 * export const MyComponent = () => {
 *   return <MyQueryStore.Provider
 *      values={{
 *          // Optional default values
 *          filter: {name: "John"},
 *      }}
 *   >
 *       <AnotherComponent/>
 *   <MyQueryStore.Provider/>
 * }
 * ```
 */
export namespace createQueryStore {
    /**
     * Props for `createQueryStore`.
     *
     * @template TQuerySchema Query schema.
     */
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        /**
         * Query store name.
         */
        name?: string;
        /**
         * Query schema.
         */
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
