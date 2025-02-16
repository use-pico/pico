import type { css } from "@use-pico/common";
import type { ColumnType } from "./ColumnType";
import type { DataType } from "./DataType";
import type { FilterType } from "./FilterType";
import type { RowType } from "./RowType";
import type { SelectionType } from "./SelectionType";

export namespace UseTable {
	export type RowCssCallback<TData extends DataType.Data> = (props: {
		data: TData;
	}) => css.Class;
}

export interface UseTable<TData extends DataType.Data, TContext = unknown> {
	/**
	 * Data for the table.
	 */
	data: TData[];
	/**
	 * All the columns defined in the table.
	 */
	columns: ColumnType.Column<TData, any>[];
	/**
	 * Only visible columns in the table.
	 */
	visible: ColumnType.Column<TData, any>[];
	/**
	 * Rows with bound data.
	 */
	rows: RowType.Row<TData>[];
	/**
	 * Callback used to modify styles of the row.
	 */
	rowCss?: UseTable.RowCssCallback<TData>;
	/**
	 * Is the table empty (shortcut for data.length === 0).
	 */
	isEmpty: boolean;
	/**
	 * Filter configuration and state for the table.
	 */
	filter: FilterType.Filter;
	/**
	 * Selection configuration and state for the table.
	 */
	selection: SelectionType.Selection<TData>;
	/**
	 * Context for the table.
	 */
	context: TContext;
}
