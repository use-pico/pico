import {
    type FilterSchema,
    type IQueryStore,
    type OrderBySchema,
    type QuerySchema
}                from "@use-pico/query";
import {
    type IStore,
    useStore
}                from "@use-pico/store";
import {type FC} from "react";

export namespace WithFilter {
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        withQueryStore: IQueryStore.Store<TQuerySchema>;
        Filter: WithFilter<TQuerySchema>;
    }

    export type WithFilter<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>
    > = FC<WithFilterProps<TQuerySchema>>;

    export type WithFilterProps<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>
    > =
        {
            withQueryStore: IQueryStore.Store<TQuerySchema>;
        }
        & Pick<
        IStore.Props<IQueryStore<TQuerySchema>>,
        "filter" | "shallowFilter" | "setFilter" | "clearFilter"
    >;
}

export const WithFilter = <
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        withQueryStore,
        Filter,
    }: WithFilter.Props<TQuerySchema>
) => {
    const {
        setFilter,
        shallowFilter,
        setCursor,
        ...query
    } = useStore(withQueryStore, (
        {
            setFilter,
            shallowFilter,
            clearFilter,
            filter,
            setCursor,
        }) => ({
        setFilter,
        shallowFilter,
        clearFilter,
        filter,
        setCursor,
    }));
    return <Filter
        withQueryStore={withQueryStore}
        shallowFilter={filter => {
            shallowFilter(filter);
            setCursor(0);
        }}
        setFilter={filter => {
            setFilter(filter);
            setCursor(0);
        }}
        {...query}
    />;
};
