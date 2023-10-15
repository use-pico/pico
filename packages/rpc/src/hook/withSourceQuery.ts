import {
    type CountSchema,
    type FilterSchema,
    type IQueryStore,
    type OrderBySchema,
    type QuerySchema,
    withQuerySchema
}                             from "@use-pico/query";
import {type ResponseSchema}  from "@use-pico/schema";
import {withFilter}           from "@use-pico/source";
import {z}                    from "@use-pico/utils";
import {type WithQuery}       from "../api/WithQuery";
import {type WithSourceQuery} from "../api/WithSourceQuery";
import {withQuery}            from "./withQuery";

export namespace withSourceQuery {
    export interface Props<
        TResponseSchema extends ResponseSchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > extends Omit<
        withQuery.Props<
            QuerySchema<
                TFilterSchema,
                TOrderBySchema
            >,
            TResponseSchema
        >,
        "schema"
    > {
        query: IQueryStore<TFilterSchema, TOrderBySchema>;
        schema: {
            filter: TFilterSchema;
            orderBy: TOrderBySchema;
            response: TResponseSchema;
        },
        withCountQuery: WithQuery<QuerySchema<TFilterSchema, TOrderBySchema>, CountSchema>;
    }
}

export const withSourceQuery = <
    TResponseSchema extends ResponseSchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>(
    {
        query,
        withCountQuery,
        schema: {
                    response,
                    ...schema
                },
        ...     props
    }: withSourceQuery.Props<TResponseSchema, TFilterSchema, TOrderBySchema>
): WithSourceQuery<TResponseSchema, TFilterSchema, TOrderBySchema> => {
    const request = withQuerySchema({
        filter:  schema.filter,
        orderBy: schema.orderBy,
    });
    const $response = z.array(response);
    const $withQuery = withQuery({
        ...props,
        schema: {
            ...schema,
            request,
            response: $response,
        },
    });
    return {
        ...$withQuery,
        query,
        schema:     {
            ...schema,
            request,
            schema:   response,
            response: $response,
        },
        useQuery:   options => {
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
        useCount:   options => {
            return withCountQuery.useQueryEx({
                request: query.use((
                    {
                        where,
                        filter,
                    }) => ({
                    where,
                    filter,
                    cursor:  undefined,
                    orderBy: undefined,
                })),
                options,
            });
        },
        useCountEx: props => {
            return withCountQuery.useQueryEx(props);
        },
        useInvalidator() {
            const invalidator = $withQuery.useInvalidator();
            const countInvalidator = withCountQuery.useInvalidator();
            return async () => {
                await invalidator();
                await countInvalidator();
            };
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
        WithFilter:        withFilter({
            withQueryStore: query,
        }),
    };
};
