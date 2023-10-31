import {useQuery as useCoolQuery} from "@tanstack/react-query";
import {
    type IQueryStore,
    type IWithQuery,
    type QuerySchema,
    usePromise,
    useQueryOf
}                                 from "@use-pico/query";
import {
    type ArraySchema,
    WithIdentitySchema
}                                 from "@use-pico/schema";
import {type IWithSourceQuery}    from "../api/IWithSourceQuery";

export namespace useQuery {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
        TResponseSchema extends WithIdentitySchema,
    > extends IWithQuery.QueryOptions<ArraySchema<TResponseSchema>> {
        store: IQueryStore.Store<TQuerySchema>;
        withSourceQuery: IWithSourceQuery<TQuerySchema, TResponseSchema>;
    }
}

export const useQuery = <
    TQuerySchema extends QuerySchema<any, any>,
    TResponseSchema extends WithIdentitySchema,
>(
    {
        store,
        withSourceQuery,
        queryKey,
        ...options
    }: useQuery.Props<TQuerySchema, TResponseSchema>
): IWithSourceQuery.Result<TResponseSchema> => {
    const promise = usePromise({withQuery: withSourceQuery});
    const query = useQueryOf({store});

    return useCoolQuery({
        queryKey: withSourceQuery.key.concat(queryKey || []).concat(query),
        queryFn:  async () => {
            return promise(query);
        },
        ...options,
    });
};
