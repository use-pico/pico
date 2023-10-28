import {
    type FilterSchema,
    type OrderBySchema,
    QuerySchema
}                             from "@use-pico/query";
import {type WithSourceQuery} from "@use-pico/rpc";
import {
    type PicoSchema,
    type WithIdentitySchema
}                             from "@use-pico/schema";
import {type ISelectionStore} from "@use-pico/selection";
import {type ComponentProps}  from "react";
import {QueryInput}           from "../input/QueryInput";
import type {ValuesSchema}    from "../schema/ValuesSchema";

export namespace withSourceQueryInput {
    export interface Props<
        TResponseSchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        withSourceQuery: WithSourceQuery<TResponseSchema, TQuerySchema>;
        SelectionStore: ISelectionStore<PicoSchema.Output<TResponseSchema>>;
    }
}

export const withSourceQueryInput = <
    TResponseSchema extends WithIdentitySchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        withSourceQuery,
        SelectionStore,
    }: withSourceQueryInput.Props<
        TResponseSchema,
        TQuerySchema
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
                TQuerySchema
            >,
            "withSourceQuery" | "SelectionStore" | "withFindByQuery"
        > & {
               queryDefaults?: ComponentProps<
                   WithSourceQuery<
                       TResponseSchema,
                       TQuerySchema
                   >["store"]["Provider"]
               >["defaults"]
           }
    ) {
        return <withSourceQuery.store.Provider
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
        </withSourceQuery.store.Provider>;
    };
};
