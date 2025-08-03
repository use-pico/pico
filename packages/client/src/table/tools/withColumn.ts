import type { DeepKeys, EntitySchema, withQuerySchema } from "@use-pico/common";
import { withRangeFilter } from "../filter/withRangeFilter";
import type { Table } from "../Table";

export const withColumn = <
	TQuery extends withQuerySchema.Query,
	TData extends EntitySchema.Type,
	TContext = unknown,
>() => {
	return {
		create<TKey extends DeepKeys<TData>>(
			props: Table.Column.Props<TQuery, TData, TKey, TContext>,
		) {
			return props;
		},
		filter: {
			range(props: withRangeFilter.Props<TData, TQuery["filter"]>) {
				return withRangeFilter(props);
			},
		},
	} as const;
};
