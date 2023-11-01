import {
    type CountSchema,
    type IWithQuery,
    type QuerySchema,
    withQuery
}                              from "@use-pico/query";
import {
    type ArraySchema,
    schema,
    type WithIdentitySchema
}                              from "@use-pico/schema";
import {type IWithSourceQuery} from "../api/IWithSourceQuery";

export namespace withSourceQuery {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
        TSchema extends WithIdentitySchema,
    > extends Omit<
        withQuery.Props<TQuerySchema, ArraySchema<TSchema>>,
        "schema"
    > {
        schema: {
            query: TQuerySchema;
            response: TSchema;
        };
        withCountQuery: IWithQuery<TQuerySchema, CountSchema>;
    }
}

export const withSourceQuery = <
    TQuerySchema extends QuerySchema<any, any>,
    TSchema extends WithIdentitySchema,
>(
    {
        withCountQuery,
        schema: {
                    query,
                    response,
                },
        invalidator,
        ...props
    }: withSourceQuery.Props<
        TQuerySchema,
        TSchema
    >
): IWithSourceQuery<
    TQuerySchema,
    TSchema
> => {
    const $response = schema(z => z.array(response));
    const $withQuery = withQuery({
        ...props,
        schema: {
            request:  query,
            response: $response,
        },
    });

    return {
        ...$withQuery,
        schema: {
            request:  query,
            response: $response,
        },
        async invalidator(props) {
            await invalidator?.(props);
            await withCountQuery?.invalidator?.(props);
        },
        withCountQuery,
    };
};
