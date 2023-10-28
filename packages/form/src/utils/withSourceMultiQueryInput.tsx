import {
    type FilterSchema,
    type OrderBySchema,
    QuerySchema
}                                  from "@use-pico/query";
import {type WithSourceQuery}      from "@use-pico/rpc";
import {
    type PicoSchema,
    type WithIdentitySchema
}                                  from "@use-pico/schema";
import {type IMultiSelectionStore} from "@use-pico/selection";
import {type ComponentProps}       from "react";
import {MultiQueryInput}           from "../input/MultiQueryInput";
import type {ValuesSchema}         from "../schema/ValuesSchema";

export namespace withSourceMultiQueryInput {
    export interface Props<
        TResponseSchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        withSourceQuery: WithSourceQuery<TResponseSchema, TQuerySchema>;
        MultiSelectionStore: IMultiSelectionStore<PicoSchema.Output<TResponseSchema>>;
    }
}

export const withSourceMultiQueryInput = <
    TResponseSchema extends WithIdentitySchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        withSourceQuery,
        MultiSelectionStore,
    }: withSourceMultiQueryInput.Props<TResponseSchema, TQuerySchema>
) => {
    return function <
        TValuesSchema extends ValuesSchema,
    >(
        {
            queryDefaults,
            ...props
        }: Omit<MultiQueryInput.Props<TValuesSchema, TResponseSchema, TQuerySchema>, "withSourceQuery" | "MultiSelectionStore" | "withFindByQuery"> & {
            queryDefaults?: ComponentProps<WithSourceQuery<TResponseSchema, TQuerySchema>["store"]["Provider"]>["defaults"]
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
            <MultiQueryInput
                withSourceQuery={withSourceQuery}
                MultiSelectionStore={MultiSelectionStore}
                {...props}
            />
        </withSourceQuery.store.Provider>;
    };
};
