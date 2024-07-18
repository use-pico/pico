import type {
	RequestSchema,
	ResponseSchema
}                  from "@use-pico/common";
import {withQuery} from "../query/withQuery";
import {useStore}  from "../store/useStore";
import {RpcStore}  from "./RpcStore";
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
