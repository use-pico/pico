import type { DeepKeys, EntitySchema, withQuerySchema } from "@use-pico/common";
import { withEqualFilter } from "../filter/withEqualFilter";
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
			equal(props: withEqualFilter.Props<TData, TQuery["filter"]>) {
				return withEqualFilter(props);
			},
			range(props: withRangeFilter.Props<TData, TQuery["filter"]>) {
				return withRangeFilter(props);
			},
		},
	} as const;
};
