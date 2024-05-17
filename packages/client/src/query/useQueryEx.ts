import {useQuery}   from "@tanstack/react-query";
import type {
    RequestSchema,
    ResponseSchema
}                   from "@use-pico2/common";
import {IWithQuery} from "./IWithQuery";
import {usePromise} from "./usePromise";

export namespace useQueryEx {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > extends IWithQuery.Options<TRequestSchema, TResponseSchema> {
        withQuery: IWithQuery<TRequestSchema, TResponseSchema>;
    }
}

/**
 * Same as useQuery, but with extended parameters to further customize the query.
 */
export const useQueryEx = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    {
        withQuery,
        request,
        options: {
                     queryKey,
                     ...options
                 } = {}
    }: useQueryEx.Props<TRequestSchema, TResponseSchema>
) => {
    const promise = usePromise({withQuery});
    return useQuery({
        queryKey: withQuery.key.concat(queryKey || [], request),
        queryFn:  async () => promise(request),
        ...options,
    });
};
