import {
    type MutationKey,
    type UseMutationOptions,
    type UseMutationResult
}                            from "@tanstack/react-query";
import {
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
}                            from "@use-pico/schema";
import {ErrorResponseSchema} from "../schema/ErrorResponseSchema";
import {type IInvalidator}   from "./IInvalidator";

export interface WithMutation<
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
> {
    /**
     * Mutation key used in React Query
     */
    readonly key: MutationKey;
    schema: {
        request: TRequestSchema,
        response: TResponseSchema,
    };
    useInvalidator: IInvalidator.Use;
    useMutation: (props?: WithMutation.Options<TRequestSchema, TResponseSchema>) => WithMutation.Result<
        TRequestSchema,
        TResponseSchema
    >;
}

export namespace WithMutation {
    export type Options<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > = Omit<
        UseMutationOptions<
            PicoSchema.Output<TResponseSchema>,
            ErrorResponseSchema.Type,
            PicoSchema.Output<TRequestSchema>
        >,
        "mutationFn"
    >;

    export type Result<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > = UseMutationResult<
        PicoSchema.Output<TResponseSchema>,
        ErrorResponseSchema.Type,
        PicoSchema.Output<TRequestSchema>
    >;
}
