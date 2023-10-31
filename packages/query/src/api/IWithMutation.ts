import {
    type MutationKey,
    type UseMutationOptions,
    type UseMutationResult
}                          from "@tanstack/react-query";
import {
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
}                          from "@use-pico/schema";
import {type IInvalidator} from "./IInvalidator";

export interface IWithMutation<
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
> extends IInvalidator {
    /**
     * Mutation key used in React Query
     */
    readonly key: MutationKey;
    schema: {
        request: TRequestSchema,
        response: TResponseSchema,
    };
    defaultOptions?: IWithMutation.Options<TRequestSchema, TResponseSchema>;

    mutator(request: PicoSchema.Output<TRequestSchema>): Promise<PicoSchema.Output<TResponseSchema>>;
}

export namespace IWithMutation {
    export type Options<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > = Omit<
        UseMutationOptions<
            PicoSchema.Output<TResponseSchema>,
            any,
            PicoSchema.Output<TRequestSchema>
        >,
        "mutationFn"
    >;

    export type Result<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > = UseMutationResult<
        PicoSchema.Output<TResponseSchema>,
        any,
        PicoSchema.Output<TRequestSchema>
    >;
}
