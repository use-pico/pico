import {CountSchema}    from "@use-pico/query";
import {
    withRpcMutation,
    withRpcQuery,
    withRpcSourceQuery
}                       from "@use-pico/rpc";
import {withDullSchema} from "./withDullSchema";

export namespace withDullRpc {
    export interface Props<
        TSchema extends withDullSchema.Schema<any, any, any, any>,
    > {
        /**
         * Base key for all RPC calls.
         */
        key: string[];
        schema: TSchema;
        invalidator?: ReadonlyArray<unknown>;
    }

    export interface Rpc<
        TSchema extends withDullSchema.Schema<any, any, any, any>,
    > {
        schema: TSchema;
        query: ReturnType<typeof withRpcSourceQuery<
            TSchema["query"],
            TSchema["entity"]
        >>;
        count: ReturnType<typeof withRpcQuery<
            TSchema["query"],
            CountSchema
        >>;
        mutation: ReturnType<typeof withRpcMutation<
            TSchema["mutation"],
            TSchema["entity"]
        >>;
    }
}

export const withDullRpc = <
    TSchema extends withDullSchema.Schema<any, any, any, any>,
>(
    {
        key,
        schema,
        invalidator,
    }: withDullRpc.Props<
        TSchema
    >,
) => {
    const count = withRpcQuery({
        key:    key.concat(["count"]),
        schema: {
            request:  schema.query,
            response: CountSchema,
        },
    });
    const query = withRpcSourceQuery({
        key:            key.concat(["query"]),
        schema:         {
            query:    schema.query,
            response: schema.entity
        },
        withCountQuery: count,
    });
    const mutation = withRpcMutation({
        key:         key.concat(["mutation"]),
        schema:      {
            request:  schema.mutation,
            response: schema.entity,
        },
        invalidator: async () => {
            return [
                count.key,
                query.key,
                ...invalidator || [],
            ];
        }
    });

    return {
        schema,
        query,
        count,
        mutation,
    };
};
