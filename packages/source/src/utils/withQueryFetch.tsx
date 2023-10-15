import {
    type FilterSchema,
    type OrderBySchema
}                             from "@use-pico/query";
import {type WithSourceQuery} from "@use-pico/rpc";
import {type ResponseSchema}  from "@use-pico/schema";
import {type FC}              from "react";
import {QueryFetch}           from "../ui/QueryFetch";

export namespace withQueryFetch {
    export interface Props<
        TResponseSchema extends ResponseSchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        withSourceQuery: WithSourceQuery<TResponseSchema, TFilterSchema, TOrderBySchema>;
    }

    export type Query<
        TResponseSchema extends ResponseSchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > = FC<
        Omit<
            QueryFetch.Props<TResponseSchema, TFilterSchema, TOrderBySchema>,
            "withSourceQuery"
        >
    >;
}

export const withQueryFetch = <
    TResponseSchema extends ResponseSchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>(
    {
        withSourceQuery,
    }: withQueryFetch.Props<TResponseSchema, TFilterSchema, TOrderBySchema>
): withQueryFetch.Query<TResponseSchema, TFilterSchema, TOrderBySchema> => {
    return props => <QueryFetch withSourceQuery={withSourceQuery} {...props}/>;
};
