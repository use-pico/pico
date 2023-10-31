import {
    type FilterSchema,
    type IQueryStore,
    type OrderBySchema,
    type QuerySchema
}                              from "@use-pico/query";
import {
    type PicoSchema,
    type WithIdentitySchema
}                              from "@use-pico/schema";
import {type ISelectionStore}  from "@use-pico/selection";
import {type IWithSourceQuery} from "@use-pico/source";
import {StoreProvider}         from "@use-pico/store";
import {QueryInput}            from "../input/QueryInput";
import type {ValuesSchema}     from "../schema/ValuesSchema";

export namespace withSourceQueryInput {
    export interface Props<
        TResponseSchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        withQueryStore: IQueryStore.Store<TQuerySchema>;
        withSourceQuery: IWithSourceQuery<TQuerySchema, TResponseSchema>;
        SelectionStore: ISelectionStore<PicoSchema.Output<TResponseSchema>>;
    }
}

export const withSourceQueryInput = <
    TResponseSchema extends WithIdentitySchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        withQueryStore,
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
            queryDefaults?: PicoSchema.Output<TQuerySchema>;
           }
    ) {
        return <StoreProvider
            store={withQueryStore}
            values={{
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
        </StoreProvider>;
    };
};
