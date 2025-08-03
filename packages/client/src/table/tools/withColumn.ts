import type { DeepKeys, EntitySchema, withQuerySchema } from "@use-pico/common";
import type { Table } from "../Table";

export const withColumn = <
	TQuery extends withQuerySchema.Query,
	TData extends EntitySchema.Type,
	TContext = unknown,
>() => {
	return <TKey extends DeepKeys<TData>>(
		props: Table.Column.Props<TQuery, TData, TKey, TContext>,
	) => {
		return props;
	};
};
