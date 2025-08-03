import type { DeepKeys, EntitySchema } from "@use-pico/common";
import type { Table } from "../Table";

export const withColumn = <
	TData extends EntitySchema.Type,
	TContext = unknown,
>() => {
	return <TKey extends DeepKeys<TData>>(
		props: Table.Column.Props<TData, TKey, TContext>,
	) => {
		return props;
	};
};
