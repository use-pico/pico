import type {
	FilterSchema,
	OrderBySchema,
	QuerySchema,
	WithIdentitySchema
}                              from "@use-pico/common";
import {z}                     from "zod";
import type {IWithSourceQuery} from "../query/IWithSourceQuery";
import {withSourceQuery}       from "../query/withSourceQuery";
import {useStore}              from "../store/useStore";
import {RpcStore}              from "./RpcStore";
import {withBulk}              from "./withBulk";

export namespace withRpcSourceQuery {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> extends Omit<
		withSourceQuery.Props<TQuerySchema, TSchema>,
		"useCallback"
	> {
	}
}

export const withRpcSourceQuery = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>(
	props: withRpcSourceQuery.Props<TQuerySchema, TSchema>
): IWithSourceQuery<TQuerySchema, TSchema> => {
	return withSourceQuery({
		...props,
		useCallback: () => {
			const store = useStore(RpcStore);
			return async request => withBulk({
				schema:  z.array(props.schema.response),
				request,
				service: props.key.join("."),
				store
			});
		}
	});
};
