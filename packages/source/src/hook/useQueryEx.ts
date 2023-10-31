import {useQuery as useCoolQuery} from "@tanstack/react-query";
import {
    type IWithQuery,
    type QuerySchema,
    usePromise
}                                 from "@use-pico/query";
import {
    type ArraySchema,
    type WithIdentitySchema
}                                 from "@use-pico/schema";
import {type IWithSourceQuery}    from "../api/IWithSourceQuery";

export namespace useQueryEx {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
        TResponseSchema extends WithIdentitySchema,
    > extends IWithQuery.Options<TQuerySchema, ArraySchema<TResponseSchema>> {
        withSourceQuery: IWithSourceQuery<TQuerySchema, TResponseSchema>;
    }
}

export const useQueryEx = <
    TQuerySchema extends QuerySchema<any, any>,
    TResponseSchema extends WithIdentitySchema,
>(
    {
        withSourceQuery,
        request,
        options: {
                     queryKey,
                     ...options
                 } = {}
    }: useQueryEx.Props<TQuerySchema, TResponseSchema>
): IWithQuery.Result<ArraySchema<TResponseSchema>> => {
    const promise = usePromise({withQuery: withSourceQuery});
    return useCoolQuery({
        queryKey: withSourceQuery.key.concat(queryKey || []),
        queryFn:  async () => promise(request),
        ...options,
    });
};
