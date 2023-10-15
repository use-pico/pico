import {
    FilterSchema,
    type IQueryStore,
    OrderBySchema
}                from "@pico/query";
import {type FC} from "react";

export namespace withFilter {
    export interface Props<
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        withQueryStore: IQueryStore<TFilterSchema, TOrderBySchema>;
    }

    export type WithFilter<
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > = FC<WithFilterProps<TFilterSchema, TOrderBySchema>>;

    export interface WithFilterProps<
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        Filter: WithFilterItem<TFilterSchema, TOrderBySchema>;
    }

    export type WithFilterItem<
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > = FC<WithFilterItemProps<TFilterSchema, TOrderBySchema>>;

    export interface WithFilterItemProps<
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        withQueryStore: IQueryStore<TFilterSchema, TOrderBySchema>;
        filter: ReturnType<IQueryStore<TFilterSchema, TOrderBySchema>["use"]>["filter"];
        shallowFilter: ReturnType<IQueryStore<TFilterSchema, TOrderBySchema>["use"]>["shallowFilter"];
        setFilter: ReturnType<IQueryStore<TFilterSchema, TOrderBySchema>["use"]>["setFilter"];
        clearFilter: ReturnType<IQueryStore<TFilterSchema, TOrderBySchema>["use"]>["clearFilter"];
    }
}

export const withFilter = <
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>(
    {
        withQueryStore,
    }: withFilter.Props<TFilterSchema, TOrderBySchema>
): withFilter.WithFilter<TFilterSchema, TOrderBySchema> => {
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
