import {type MutationKey}   from "@tanstack/react-query";
import {
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
}                           from "@use-pico/schema";
import {type IWithMutation} from "../api/IWithMutation";

export namespace withMutation {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > {
        key: MutationKey;
        schema: {
            request: TRequestSchema;
            response: TResponseSchema;
        };

        mutator(request: PicoSchema.Output<TRequestSchema>): Promise<PicoSchema.Output<TResponseSchema>>;

        invalidator?: IWithMutation<TRequestSchema, TResponseSchema>["invalidator"];

        defaultOptions?: IWithMutation.Options<TRequestSchema, TResponseSchema>;
    }
}

export const withMutation = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    {
        key,
        schema,
        mutator,
        invalidator,
        defaultOptions,
    }: withMutation.Props<
        TRequestSchema,
        TResponseSchema
    >
): IWithMutation<TRequestSchema, TResponseSchema> => {
    return {
        key,
        schema,
        mutator,
        invalidator,
        defaultOptions,
    };
};
