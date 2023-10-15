import {
    type FilterSchema,
    type OrderBySchema,
    type WithIdentitySchema
}                             from "@pico/query";
import {type WithSourceQuery} from "@pico/rpc";
import {type ISelectionStore} from "@pico/selection";
import {type z}               from "@pico/utils";
import {type ComponentProps}  from "react";
import {QueryInput}           from "../input/QueryInput";
import type {ValuesSchema}    from "../schema/ValuesSchema";

export namespace withSourceQueryInput {
    export interface Props<
        TResponseSchema extends WithIdentitySchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        withSourceQuery: WithSourceQuery<TResponseSchema, TFilterSchema, TOrderBySchema>;
        SelectionStore: ISelectionStore<z.infer<TResponseSchema>>;
    }
}

export const withSourceQueryInput = <
    TResponseSchema extends WithIdentitySchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>(
    {
        withSourceQuery,
        SelectionStore,
    }: withSourceQueryInput.Props<
        TResponseSchema,
        TFilterSchema,
        TOrderBySchema
    >
) => {
    return function <
        TValuesSchema extends ValuesSchema,
    >(
        {
            queryDefaults,
            ...props
        }: Omit<
            QueryInput.Props<
                TValuesSchema,
                TResponseSchema,
                TFilterSchema,
                TOrderBySchema
            >,
            "withSourceQuery" | "SelectionStore" | "withFindByQuery"
        > & {
               queryDefaults?: ComponentProps<
                   WithSourceQuery<
                       TResponseSchema,
                       TFilterSchema,
                       TOrderBySchema
                   >["query"]["Provider"]
               >["defaults"]
           }
    ) {
        return <withSourceQuery.query.Provider
            defaults={{
                cursor: {
                    page: 0,
                    size: 10,
                },
                ...queryDefaults,
            }}
        >
            <QueryInput
                withSourceQuery={withSourceQuery}
                SelectionStore={SelectionStore}
                {...props}
            />
        </withSourceQuery.query.Provider>;
    };
};
