import {useQuery}   from "@tanstack/react-query";
import type {
    RequestSchema,
    ResponseSchema
}                   from "@use-pico/common";
import {IWithQuery} from "./IWithQuery";
import {usePromise} from "./usePromise";

/**
 * Same as {@link useQuery}, but with extended parameters to further customize the query.
 *
 * @group query
 */
export namespace useQueryEx {
    /**
     * Props for the `useQueryEx` hook.
     */
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > extends IWithQuery.Options<TRequestSchema, TResponseSchema> {
        /**
         * Query used to fetch data.
         */
        withQuery: IWithQuery<TRequestSchema, TResponseSchema>;
    }
}

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
