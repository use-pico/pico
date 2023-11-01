import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                                from "@use-pico/query";
import {type WithIdentitySchema} from "@use-pico/schema";
import {type IWithSourceQuery}   from "@use-pico/source";
import {type FC}                 from "react";
import {QueryFetch}              from "../ui/QueryFetch";

export namespace withQueryFetch {
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TResponseSchema extends WithIdentitySchema,
    > {
        withSourceQuery: IWithSourceQuery<TQuerySchema, TResponseSchema>;
    }

    export type Query<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TResponseSchema extends WithIdentitySchema,
    > = FC<
        Omit<
            QueryFetch.Props<TQuerySchema, TResponseSchema>,
            "withSourceQuery"
        >
    >;
}

export const withQueryFetch = <
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TResponseSchema extends WithIdentitySchema,
>(
    {
        withSourceQuery,
    }: withQueryFetch.Props<TQuerySchema, TResponseSchema>
): withQueryFetch.Query<TQuerySchema, TResponseSchema> => {
    return props => <QueryFetch withSourceQuery={withSourceQuery} {...props}/>;
};
