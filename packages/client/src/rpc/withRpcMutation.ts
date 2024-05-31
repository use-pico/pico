import type {RequestSchema, ResponseSchema} from "@use-pico/common";
import {withMutation} from "../query/withMutation";
import {useStore} from "../store/useStore";
import {RpcStore} from "./RpcStore";
import {withBulk} from "./withBulk";

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
				schema: props.schema.response,
				request,
				service: props.key.join("."),
				store
			});
		}
	});
};
