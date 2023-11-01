import {
    type IWithQuery,
    type QuerySchema
}                                from "@use-pico/query";
import {type WithIdentitySchema} from "@use-pico/schema";
import {type FC}                 from "react";
import {Fetch}                   from "../ui/Fetch";

export namespace withFetch {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
        TResponseSchema extends WithIdentitySchema,
    > {
        withQuery: IWithQuery<TQuerySchema, TResponseSchema>;
    }

    export type Fetch<
        TQuerySchema extends QuerySchema<any, any>,
        TResponseSchema extends WithIdentitySchema,
    > = FC<
        Omit<
            Fetch.Props<TQuerySchema, TResponseSchema>,
            "withQuery"
        >
    >;
}

export const withFetch = <
    TQuerySchema extends QuerySchema<any, any>,
    TResponseSchema extends WithIdentitySchema,
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
