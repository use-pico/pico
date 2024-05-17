import {
    type QueryKey,
    type UseQueryOptions,
    type UseQueryResult
}                          from "@tanstack/react-query";
import type {
    RequestSchema,
    ResponseSchema
}                          from "@use-pico2/common";
import {type z}            from "zod";
import {type IInvalidator} from "./IInvalidator";

export namespace IWithQuery {
    export interface Options<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > {
        request: z.infer<TRequestSchema>;
        options?: QueryOptions<TResponseSchema>;
    }

    export type QueryOptions<
        TResponseSchema extends ResponseSchema,
    > =
        Omit<
            UseQueryOptions<
                any,
                any,
                z.infer<TResponseSchema>
            >, "queryFn" | "queryKey"
        >
        & Partial<
        Pick<
            UseQueryOptions<
                any,
                any,
                z.infer<TResponseSchema>
            >,
            "queryKey"
        >
    >;

    export type Result<
        TResponseSchema extends ResponseSchema,
    > = UseQueryResult<
        z.infer<TResponseSchema>,
        any
    >;
}

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

    useCallback(): (request: z.infer<TRequestSchema>) => Promise<z.infer<TResponseSchema>>;
}
