import {
    type CountSchema,
    type IQueryStore,
    type QuerySchema
}                             from "@use-pico/query";
import {
    type ResponseSchema,
    schema
}                             from "@use-pico/schema";
import {withFilter}           from "@use-pico/source";
import {type WithQuery}       from "../api/WithQuery";
import {type WithSourceQuery} from "../api/WithSourceQuery";
import {withQuery}            from "./withQuery";

export namespace withSourceQuery {
    export interface Props<
        TResponseSchema extends ResponseSchema,
        TQuerySchema extends QuerySchema<any, any>
    > extends Omit<
        withQuery.Props<
            TQuerySchema,
            TResponseSchema
        >,
        "schema"
    > {
        store: IQueryStore<TQuerySchema>;
        schema: {
            query: TQuerySchema;
            response: TResponseSchema;
        },
        withCountQuery: WithQuery<TQuerySchema, CountSchema>;
    }
}

export const withSourceQuery = <
    TResponseSchema extends ResponseSchema,
    TQuerySchema extends QuerySchema<any, any>
>(
    {
        store,
        withCountQuery,
        schema: {
                    response,
                    query,
                },
        ...     props
    }: withSourceQuery.Props<TResponseSchema, TQuerySchema>
): WithSourceQuery<TResponseSchema, TQuerySchema> => {
    const $response = schema(z => z.array(response));
    const $withQuery = withQuery({
        ...props,
        schema: {
            request: query,
            response: $response,
        },
    });
    return {
        ...$withQuery,
        store,
        schema:     {
            schema:   response,
            request: query,
            response: $response,
        },
        useQuery:   options => {
            return $withQuery.useQueryEx({
                request: store.use((
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
                request: store.use((
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
            const setFilter = store.use(({setFilter}) => setFilter);
            return filter => setFilter(filter);
        },
        useShallowFilter:  () => {
            const shallowFilter = store.use(({shallowFilter}) => shallowFilter);
            return filter => shallowFilter(filter);
        },
        useOrderBy:        () => {
            const setOrderBy = store.use(({setOrderBy}) => setOrderBy);
            return orderBy => setOrderBy(orderBy);
        },
        useShallowOrderBy: () => {
            const shallowOrderBy = store.use(({shallowOrderBy}) => shallowOrderBy);
            return orderBy => shallowOrderBy(orderBy);
        },
        WithFilter:        withFilter({
            withQueryStore: store,
        }),
    };
};
