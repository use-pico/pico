import {type QuerySchema} from "@use-pico/query";
import {
    schema,
    type WithIdentitySchema
}                         from "@use-pico/schema";
import {withSourceQuery}  from "@use-pico/source";
import {useStore}         from "@use-pico/store";
import {RpcStore}         from "../store/RpcStore";
import {withBulk}         from "./withBulk";

export namespace withRpcSourceQuery {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
        TSchema extends WithIdentitySchema,
    > extends Omit<
        withSourceQuery.Props<TQuerySchema, TSchema>,
        "useCallback"
    > {
    }
}

export const withRpcSourceQuery = <
    TQuerySchema extends QuerySchema<any, any>,
    TSchema extends WithIdentitySchema,
>(
    props: withRpcSourceQuery.Props<TQuerySchema, TSchema>
) => {
    return withSourceQuery({
        ...props,
        useCallback: () => {
            const store = useStore(RpcStore);
            return async request => withBulk({
                schema:  schema(z => z.array(props.schema.response)),
                request,
                service: props.key.join("."),
                store
            });
        }
    });
};
