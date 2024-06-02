import type {
    RequestSchema,
    ResponseSchema
}                     from "@use-pico/common";
import {withMutation} from "../query/withMutation";
import {useStore}     from "../store/useStore";
import {RpcStore}     from "./RpcStore";
import {withBulk}     from "./withBulk";

/**
 * This is a wrapper method for {@link withMutation} connected to RPC endpoint (store).
 *
 * That means all mutations created by this method will be collected within a little timout and batched together to
 * save bandwidth.
 *
 * @group rpc
 */
export namespace withRpcMutation {
    /**
     * Props for `withRpcMutation` method.
     *
     * Same as {@link withMutation.Props} but without `useCallback` property.
     *
     * @template TRequestSchema Request schema.
     * @template TResponseSchema Response schema.
     */
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
                schema: props.schema.response,
				request,
				service: props.key.join("."),
				store
			});
		}
	});
};
