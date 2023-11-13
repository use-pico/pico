import {
    type FilterSchema,
    type IQueryStore,
    type OrderBySchema,
    type QuerySchema
}                                  from "@use-pico/query";
import {
    type PicoSchema,
    type WithIdentitySchema
}                                  from "@use-pico/schema";
import {withSelectionStore}        from "@use-pico/selection";
import {type IWithSourceQuery}     from "@use-pico/source";
import {withSourceMultiQueryInput} from "./withSourceMultiQueryInput";
import {withSourceQueryInput}      from "./withSourceQueryInput";

export namespace withSourceSelectionInput {
    export interface Props<
        TEntitySchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        withQueryStore: IQueryStore.Store<TQuerySchema>;
        withSourceQuery: IWithSourceQuery<TQuerySchema, TEntitySchema>;
        SelectionStore: withSelectionStore.Store<PicoSchema.Output<TEntitySchema>>;
    }
}

export const withSourceSelectionInput = <
    TEntitySchema extends WithIdentitySchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        withSourceQuery,
        withQueryStore,
        SelectionStore: {
                            single,
                            multi
                        },
    }: withSourceSelectionInput.Props<TEntitySchema, TQuerySchema>,
) => {
    return {
        single: withSourceQueryInput({
            withSourceQuery,
            withQueryStore,
            SelectionStore: single,
        }),
        multi:  withSourceMultiQueryInput({
            withSourceQuery,
            withQueryStore,
            MultiSelectionStore: multi,
        }),
    };
};
