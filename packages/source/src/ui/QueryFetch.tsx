"use client";

import {
    ErrorResponseSchema,
    type FilterSchema,
    type OrderBySchema,
    QueryResult,
    QuerySchema,
    WithQuery
}                             from "@pico/query";
import {type WithSourceQuery} from "@pico/rpc";
import {type ResponseSchema}  from "@pico/types";
import {Loader}               from "@pico/ui";
import {type z}               from "@pico/utils";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                             from "react";

export namespace QueryFetch {
    export interface Props<
        TResponseSchema extends ResponseSchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        loader?: ReactNode;
        filter?: z.infer<TFilterSchema> | null;
        /**
         * Query to fetch entity
         */
        withSourceQuery: WithSourceQuery<TResponseSchema, TFilterSchema, TOrderBySchema>;
        query?: ComponentProps<WithSourceQuery<TResponseSchema, TFilterSchema, TOrderBySchema>["query"]["Provider"]>["defaults"];

        /**
         * Error renderer
         */
        WithError?: FC<WithErrorProps>;

        /**
         * Success renderer
         */
        WithSuccess: FC<WithSuccessProps<TResponseSchema>>;
        enabled?: boolean;
        options?: WithQuery.QueryOptions<QuerySchema<TFilterSchema, TOrderBySchema>, TResponseSchema>;
    }

    export interface WithErrorProps {
        error: ErrorResponseSchema.Type;
    }

    export interface WithSuccessProps<TResponseSchema extends ResponseSchema> {
        entities: z.infer<TResponseSchema>[];
    }
}

export const QueryFetch = <
    TResponseSchema extends ResponseSchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>(
    {
        loader,
        filter,
        withSourceQuery,
        query,
        WithError = () => null,
        WithSuccess,
        enabled = true,
        options,
    }: QueryFetch.Props<TResponseSchema, TFilterSchema, TOrderBySchema>
) => {
    const result = withSourceQuery.useQueryEx({
        /**
         * @TODO Fix any type
         *
         * As any: for some reason, types are not working here, or I just don't know, how to type it here properly.
         */
        request: (query || filter ? {filter} : {}) as any,
        options: {
            ...options,
            enabled,
        },
    });
    return <QueryResult
        result={result}
        WithLoading={() => loader || <Loader type={"dots"} size={"xs"}/>}
        WithError={WithError}
        WithSuccess={({data}) => <WithSuccess entities={data}/>}
    />;
};
