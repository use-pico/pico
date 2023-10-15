import {FilterSchema}            from "@use-pico/query";
import {type WithIdentitySchema} from "@use-pico/schema";
import {type FC}                 from "react";
import {type IWithFetchQuery}    from "../api/IWithFetchQuery";
import {Fetch}                   from "../ui/Fetch";

export namespace withFetch {
    export interface Props<
        TFilterSchema extends FilterSchema,
        TResponseSchema extends WithIdentitySchema,
    > {
        withQuery: IWithFetchQuery<TFilterSchema, TResponseSchema>;
    }

    export type Fetch<
        TFilterSchema extends FilterSchema,
        TResponseSchema extends WithIdentitySchema,
    > = FC<
        Omit<
            Fetch.Props<TFilterSchema, TResponseSchema>,
            "withQuery"
        >
    >;
}

export const withFetch = <
    TFilterSchema extends FilterSchema,
    TResponseSchema extends WithIdentitySchema,
>(
    {
        withQuery,
    }: withFetch.Props<
        TFilterSchema,
        TResponseSchema
    >
): withFetch.Fetch<TFilterSchema, TResponseSchema> => {
    return props => <Fetch withQuery={withQuery} {...props}/>;
};
