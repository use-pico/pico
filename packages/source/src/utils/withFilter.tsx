import {
    FilterSchema,
    type IQueryStore,
    type OrderBySchema,
    type QuerySchema
}                from "@use-pico/query";
import {type FC} from "react";

export namespace withFilter {
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>
    > {
        withQueryStore: IQueryStore<TQuerySchema>;
    }

    export type WithFilter<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>
    > = FC<WithFilterProps<TQuerySchema>>;

    export interface WithFilterProps<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>
    > {
        Filter: WithFilterItem<TQuerySchema>;
    }

    export type WithFilterItem<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>
    > = FC<WithFilterItemProps<TQuerySchema>>;

    export interface WithFilterItemProps<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>
    > {
        withQueryStore: IQueryStore<TQuerySchema>;
        filter: ReturnType<IQueryStore<TQuerySchema>["use"]>["filter"];
        shallowFilter: ReturnType<IQueryStore<TQuerySchema>["use"]>["shallowFilter"];
        setFilter: ReturnType<IQueryStore<TQuerySchema>["use"]>["setFilter"];
        clearFilter: ReturnType<IQueryStore<TQuerySchema>["use"]>["clearFilter"];
    }
}

export const withFilter = <
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        withQueryStore,
    }: withFilter.Props<TQuerySchema>
): withFilter.WithFilter<TQuerySchema> => {
    return ({Filter}) => {
        const {
            setFilter,
            shallowFilter,
            setCursor,
            ...query
        } = withQueryStore.use((
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
};
