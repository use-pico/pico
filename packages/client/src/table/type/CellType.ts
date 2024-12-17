import type { DeepKeys, DeepValue } from "@use-pico/common";
import type { ColumnType } from "./ColumnType";
import type { DataType } from "./DataType";

export namespace CellType {
	export interface Cell<TData extends DataType.Data, TKey extends DeepKeys<TData>> {
		column: ColumnType.Column<TData, TKey>;
		data: TData;
		value: DeepValue<TData, TKey>;
	}
}
