import {
    QueryClient,
    type QueryKey,
    type UseQueryOptions,
    type UseQueryResult
}                          from "@tanstack/react-query";
import {
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
}                          from "@use-pico/schema";
import {type IInvalidator} from "./IInvalidator";

/**
 * This is a base object containing everything you need to use an RPC query.
 */
export interface IWithQuery<
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
> extends IInvalidator {
    /**
     * Query key used in React Query
     */
    key: QueryKey;
    /**
     * This is obvious, isn't it?
     */
    schema: {
        request: TRequestSchema;
        response: TResponseSchema;
    };

    useCallback(): (request: PicoSchema.Output<TRequestSchema>) => Promise<PicoSchema.Output<TResponseSchema>>;
}

export namespace IWithQuery {
    export interface Options<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > {
        request: PicoSchema.Output<TRequestSchema>;
        options?: QueryOptions<TResponseSchema>;
    }

    export type QueryOptions<
        TResponseSchema extends ResponseSchema,
    > =
        Omit<
            UseQueryOptions<
                any,
                any,
                PicoSchema.Output<TResponseSchema>
            >, "queryFn" | "queryKey"
        >
        & Partial<
        Pick<
            UseQueryOptions<
                any,
                any,
                PicoSchema.Output<TResponseSchema>
            >,
            "queryKey"
        >
    >;

    export interface InvalidatorProps {
        queryClient: QueryClient;
    }

    export type Result<
        TResponseSchema extends ResponseSchema,
    > = UseQueryResult<
        PicoSchema.Output<TResponseSchema>,
        any
    >;
}
