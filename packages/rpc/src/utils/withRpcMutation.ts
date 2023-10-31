import {withMutation} from "@use-pico/query";
import {
    type RequestSchema,
    type ResponseSchema
}                     from "@use-pico/schema";
import {useStore}     from "@use-pico/store";
import {RpcStore}     from "../store/RpcStore";
import {withBulk}     from "./withBulk";

export namespace withRpcMutation {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > extends Omit<
        withMutation.Props<TRequestSchema, TResponseSchema>,
        "useCallback"
    > {
    }
}

export const withRpcMutation = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    props: withRpcMutation.Props<TRequestSchema, TResponseSchema>
) => {
    return withMutation({
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
