import type {
    RequestSchema,
    ResponseSchema
}                        from "@use-pico2/common";
import {type z}          from "zod";
import type {IWithQuery} from "./IWithQuery";

export namespace withQuery {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > {
        key: string[];
        schema: {
            request: TRequestSchema;
            response: TResponseSchema;
        },
        invalidator?: IWithQuery<TRequestSchema, TResponseSchema>["invalidator"];

        useCallback(): (request: z.infer<TRequestSchema>) => Promise<z.infer<TResponseSchema>>;
    }
}

/**
 * Creates useQuery hook (basically same as the one in React Query).
 */
export const withQuery = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    {
        key,
        schema,
        useCallback,
        invalidator,
    }: withQuery.Props<TRequestSchema, TResponseSchema>
): IWithQuery<TRequestSchema, TResponseSchema> => {
    return {
        key,
        schema,
        useCallback,
        invalidator,
    };
};
