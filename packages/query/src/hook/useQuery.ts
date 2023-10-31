import {
    useQuery as useCoolQuery,
    type UseQueryResult
}                        from "@tanstack/react-query";
import {
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
}                        from "@use-pico/schema";
import {type IWithQuery} from "../api/IWithQuery";
import {usePromise}      from "./usePromise";

export namespace useQuery {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > extends IWithQuery.QueryOptions<TResponseSchema> {
        withQuery: IWithQuery<TRequestSchema, TResponseSchema>;
    }

    export type Result<
        TResponseSchema extends ResponseSchema,
    > = UseQueryResult<
        PicoSchema.Output<TResponseSchema>,
        any
    >;
}

export const useQuery = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    {
        withQuery,
        queryKey: $queryKey,
        ...       options
    }: useQuery.Props<TRequestSchema, TResponseSchema>
): useQuery.Result<TResponseSchema> => {
    const promise = usePromise({withQuery});
    return useCoolQuery({
        queryKey: withQuery.key.concat($queryKey || []),
        queryFn:  async () => promise({}),
        ...options,
    });
};
