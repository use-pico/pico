import {withQuery} from "@use-pico/query";
import {
    type RequestSchema,
    type ResponseSchema
}                  from "@use-pico/schema";
import {useStore}  from "@use-pico/store";
import {RpcStore}  from "../store/RpcStore";
import {withBulk}  from "./withBulk";

export namespace withRpcQuery {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > extends Omit<
        withQuery.Props<TRequestSchema, TResponseSchema>,
        "useCallback"
    > {
    }
}

export const withRpcQuery = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    props: withRpcQuery.Props<TRequestSchema, TResponseSchema>
) => {
    return withQuery({
        ...props,
        useCallback: () => {
            const store = useStore(RpcStore);
            return async request => withBulk({
                schema:  props.schema.response,
                request,
                service: props.key.join("."),
                store
            });
        }
    });
};
