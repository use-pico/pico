import {
    type CountSchema,
    type IQueryStore,
    type IWithQuery,
    type QuerySchema,
    useQueryEx
}                                from "@use-pico/query";
import {type WithIdentitySchema} from "@use-pico/schema";
import {useStore}                from "@use-pico/store";
import {type IWithSourceQuery}   from "../api/IWithSourceQuery";

export namespace useCount {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
        TSchema extends WithIdentitySchema,
    > extends IWithQuery.QueryOptions<CountSchema> {
        store: IQueryStore.Store<TQuerySchema>;
        withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
    }
}

export const useCount = <
    TQuerySchema extends QuerySchema<any, any>,
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
        request: useStore(store, (
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
