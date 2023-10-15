import {
    type FilterSchema,
    type OrderBySchema,
    type WithIdentitySchema
}                                  from "@pico/query";
import {type WithSourceQuery}      from "@pico/rpc";
import {type IMultiSelectionStore} from "@pico/selection";
import {type z}                    from "@pico/utils";
import {type ComponentProps}       from "react";
import {MultiQueryInput}           from "../input/MultiQueryInput";
import type {ValuesSchema}         from "../schema/ValuesSchema";

export namespace withSourceMultiQueryInput {
    export interface Props<
        TResponseSchema extends WithIdentitySchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        withSourceQuery: WithSourceQuery<TResponseSchema, TFilterSchema, TOrderBySchema>;
        MultiSelectionStore: IMultiSelectionStore<z.infer<TResponseSchema>>;
    }
}

export const withSourceMultiQueryInput = <
    TResponseSchema extends WithIdentitySchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>(
    {
        withSourceQuery,
        MultiSelectionStore,
    }: withSourceMultiQueryInput.Props<TResponseSchema, TFilterSchema, TOrderBySchema>
) => {
    return function <
        TValuesSchema extends ValuesSchema,
    >(
        {
            queryDefaults,
            ...props
        }: Omit<MultiQueryInput.Props<TValuesSchema, TResponseSchema, TFilterSchema, TOrderBySchema>, "withSourceQuery" | "MultiSelectionStore" | "withFindByQuery"> & {
            queryDefaults?: ComponentProps<WithSourceQuery<TResponseSchema, TFilterSchema, TOrderBySchema>["query"]["Provider"]>["defaults"]
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
            <MultiQueryInput
                withSourceQuery={withSourceQuery}
                MultiSelectionStore={MultiSelectionStore}
                {...props}
            />
        </withSourceQuery.query.Provider>;
    };
};
