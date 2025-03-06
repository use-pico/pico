import type { DeepKeys } from "@use-pico/common";
import type { ColumnType } from "./type/ColumnType";
import type { DataType } from "./type/DataType";

export const withColumn = <
	TData extends DataType.Data,
	TContext = unknown,
>() => {
	return <TKey extends DeepKeys<TData>>(
		props: ColumnType.Props<TData, TKey, TContext>,
	) => {
		return props;
	};
};
