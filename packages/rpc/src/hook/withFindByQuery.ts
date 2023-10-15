import {
    type FilterSchema,
    type IQueryStore,
    type OrderBySchema,
    type QuerySchema
}                             from "@pico/query";
import {type ResponseSchema}  from "@pico/types";
import {type WithFindByQuery} from "../api/WithFindByQuery";
import {withQuery}            from "./withQuery";

export namespace withFindByQuery {
    export interface Props<
        TResponseSchema extends ResponseSchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > extends withQuery.Props<QuerySchema<TFilterSchema, TOrderBySchema>, TResponseSchema> {
        query: IQueryStore<TFilterSchema, TOrderBySchema>;
    }
}

export const withFindByQuery = <
    TResponseSchema extends ResponseSchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>(
    {
        query,
        ...props
    }: withFindByQuery.Props<TResponseSchema, TFilterSchema, TOrderBySchema>
): WithFindByQuery<TResponseSchema, TFilterSchema, TOrderBySchema> => {
    const $withQuery = withQuery(props);
    return {
        ...$withQuery,
        query,
        useQuery:          options => {
            return $withQuery.useQueryEx({
                request: query.use((
                    {
                        where,
                        filter,
                        orderBy,
                        cursor,
                    }) => ({
                    where,
                    filter,
                    orderBy,
                    cursor,
                })),
                options,
            });
        },
        useFilter:         () => {
            const setFilter = query.use(({setFilter}) => setFilter);
            return filter => setFilter(filter);
        },
        useShallowFilter:  () => {
            const shallowFilter = query.use(({shallowFilter}) => shallowFilter);
            return filter => shallowFilter(filter);
        },
        useOrderBy:        () => {
            const setOrderBy = query.use(({setOrderBy}) => setOrderBy);
            return orderBy => setOrderBy(orderBy);
        },
        useShallowOrderBy: () => {
            const shallowOrderBy = query.use(({shallowOrderBy}) => shallowOrderBy);
            return orderBy => shallowOrderBy(orderBy);
        },
    };
};
