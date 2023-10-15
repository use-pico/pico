import {
    type QueryKey,
    type UseQueryOptions,
    type UseQueryResult
}                            from "@tanstack/react-query";
import {
    type RequestSchema,
    type ResponseSchema
}                            from "@use-pico/schema";
import {type z}              from "@use-pico/utils";
import {ErrorResponseSchema} from "../schema/ErrorResponseSchema";
import {type IInvalidator}   from "./IInvalidator";

/**
 * This is a base object containing everything you need to use an RPC query.
 */
export interface WithQuery<
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
> {
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
    /**
     * Invalidator hook used to generate invalidator for this query
     */
    useInvalidator: IInvalidator.Use;

    usePromise(): (request: z.infer<TRequestSchema>) => Promise<z.infer<TResponseSchema>>;

    /**
     * Simple useQuery, basically the same as useQuery in React Query; goal is to
     * provide already setup hook, which could be used to get data, eventually driven
     * by other hooks (cursor, filter, ...).
     */
    useQuery(options?: WithQuery.Options<TRequestSchema, TResponseSchema>["options"]): WithQuery.Result<TResponseSchema>;

    /**
     * Extended (low-level) useQuery without any other dependencies.
     */
    useQueryEx(props: WithQuery.Options<TRequestSchema, TResponseSchema>): WithQuery.Result<TResponseSchema>;

    /**
     * Directly update query cache with the provided data
     */
    useUpdateWith: () => (request?: z.infer<TResponseSchema>) => void;
}

export namespace WithQuery {
    export interface Options<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > {
        request: z.infer<TRequestSchema>;
        options?: Omit<
            UseQueryOptions<
                any,
                ErrorResponseSchema.Type,
                z.infer<TResponseSchema>
            >, "queryFn" | "queryKey"
        > & Partial<
            Pick<
                UseQueryOptions<
                    any,
                    ErrorResponseSchema.Type,
                    z.infer<TResponseSchema>
                >,
                "queryKey"
            >
        >;
    }

    export type QueryOptions<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > = Options<TRequestSchema, TResponseSchema>["options"];

    export type Result<
        TResponseSchema extends ResponseSchema,
    > = UseQueryResult<
        z.infer<TResponseSchema>,
        ErrorResponseSchema.Type
    >;
}
