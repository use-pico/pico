import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                             from "@use-pico/query";
import {type WithSourceQuery} from "@use-pico/rpc";
import {type ResponseSchema}  from "@use-pico/schema";
import {type FC}              from "react";
import {QueryFetch}           from "../ui/QueryFetch";

export namespace withQueryFetch {
    export interface Props<
        TResponseSchema extends ResponseSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        withSourceQuery: WithSourceQuery<TResponseSchema, TQuerySchema>;
    }

    export type Query<
        TResponseSchema extends ResponseSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > = FC<
        Omit<
            QueryFetch.Props<TResponseSchema, TQuerySchema>,
            "withSourceQuery"
        >
    >;
}

export const withQueryFetch = <
    TResponseSchema extends ResponseSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        withSourceQuery,
    }: withQueryFetch.Props<TResponseSchema, TQuerySchema>
): withQueryFetch.Query<TResponseSchema, TQuerySchema> => {
    return props => <QueryFetch withSourceQuery={withSourceQuery} {...props}/>;
};
