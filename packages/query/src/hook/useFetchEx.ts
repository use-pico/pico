import {useQuery}        from "@tanstack/react-query";
import {
    type ArraySchema,
    type RequestSchema,
    type ResponseSchema
}                        from "@use-pico/schema";
import {type IWithQuery} from "../api/IWithQuery";
import {useFetchPromise} from "./useFetchPromise";

export namespace useFetchEx {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > extends IWithQuery.Options<TRequestSchema, TResponseSchema> {
        withQuery: IWithQuery<TRequestSchema, ArraySchema<TResponseSchema>>;
    }
}

export const useFetchEx = <
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
    }: useFetchEx.Props<TRequestSchema, TResponseSchema>
) => {
    const promise = useFetchPromise({withQuery});
    return useQuery({
        queryKey: withQuery.key.concat(queryKey || [], request),
        queryFn: async () => await promise(request) ?? await Promise.reject("No data"),
        retry:   false,
        ...options,
    });
};
