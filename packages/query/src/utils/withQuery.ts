import {
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
}                        from "@use-pico/schema";
import {type IWithQuery} from "../api/IWithQuery";

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

        callback(request: PicoSchema.Output<TRequestSchema>): Promise<PicoSchema.Output<TResponseSchema>>;
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
        callback,
        invalidator,
    }: withQuery.Props<TRequestSchema, TResponseSchema>
): IWithQuery<TRequestSchema, TResponseSchema> => {
    return {
        key,
        schema,
        callback,
        invalidator,
    };
};
