import type {
    FilterSchema,
    OrderBySchema,
    QuerySchema,
    ResponseSchema
}                        from "@use-pico/common";
import {type FC}         from "react";
import {type z}          from "zod";
import {Fetch}           from "./Fetch";
import type {IWithQuery} from "./IWithQuery";

export namespace withFetch {
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TResponseSchema extends ResponseSchema,
    > {
        withQuery: IWithQuery<TQuerySchema, z.ZodArray<TResponseSchema>>;
    }

    export type Fetch<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TResponseSchema extends ResponseSchema,
    > = FC<
        Omit<
            Fetch.Props<TQuerySchema, TResponseSchema>,
            "withQuery"
        >
    >;
}

export const withFetch = <
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TResponseSchema extends ResponseSchema,
>(
    {
        withQuery,
    }: withFetch.Props<
        TQuerySchema,
        TResponseSchema
    >
): withFetch.Fetch<TQuerySchema, TResponseSchema> => {
    return props => <Fetch
        withQuery={withQuery}
        {...props}
    />;
};
