import {
    type ArraySchema,
    parse,
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
}                        from "@use-pico/schema";
import {type IWithQuery} from "../api/IWithQuery";

export namespace useFetchPromise {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > {
        withQuery: IWithQuery<TRequestSchema, ArraySchema<TResponseSchema>>;
    }

    export type Callback<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > = (request: PicoSchema.Output<TRequestSchema>) => Promise<PicoSchema.Output<TResponseSchema>>;

    export type Result<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > = Callback<TRequestSchema, TResponseSchema>;
}

export const useFetchPromise = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    {
        withQuery: {
                       useCallback,
                       schema
                   },
    }: useFetchPromise.Props<TRequestSchema, TResponseSchema>
): useFetchPromise.Result<TRequestSchema, TResponseSchema> => {
    const callback = useCallback();
    return async request => callback(parse(schema.request, request)?.[0]);
};
