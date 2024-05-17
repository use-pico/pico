import type {MutationKey}   from "@tanstack/react-query";
import type {
    RequestSchema,
    ResponseSchema
}                           from "@use-pico2/common";
import {type z}             from "zod";
import type {IWithMutation} from "./IWithMutation";

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

        useCallback(): (request: z.infer<TRequestSchema>) => Promise<z.infer<TResponseSchema>>;

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
        useCallback,
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
        useCallback,
        invalidator,
        defaultOptions,
    };
};
