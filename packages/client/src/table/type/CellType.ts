import type { DeepKeys, DeepValue } from "@use-pico/common";
import type { ColumnType } from "./ColumnType";
import type { DataType } from "./DataType";

export namespace CellType {
	/**
	 * Cell information provided to the cell component.
	 */
	export interface Cell<
		TData extends DataType.Data,
		TKey extends DeepKeys<TData>,
		TContext = any,
	> {
		/**
		 * Access to a column.
		 */
		column: ColumnType.Props<TData, TKey, TContext>;
		/**
		 * Table row data.
		 */
		data: TData;
		/**
		 * Value from the data (extracted using "name" of the column).
		 */
		value: DeepValue<TData, TKey>;
	}
}
