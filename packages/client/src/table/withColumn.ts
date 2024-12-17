import type { DeepKeys } from "@use-pico/common";
import type { ColumnType } from "./type/ColumnType";
import type { DataType } from "./type/DataType";

export const withColumn = <TData extends DataType.Data>() => {
	return <TKey extends DeepKeys<TData>>(props: ColumnType.Def<TData, TKey>) => {
		return props;
	};
};
