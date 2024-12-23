import type { ColumnType } from "./ColumnType";
import type { DataType } from "./DataType";
import type { FilterType } from "./FilterType";
import type { RowType } from "./RowType";
import type { SelectionType } from "./SelectionType";

export interface UseTable<TData extends DataType.Data> {
	columns: ColumnType.Column<TData, any>[];
	visible: ColumnType.Column<TData, any>[];
	rows: RowType.Row<TData>[];
	isEmpty: boolean;
	filter: FilterType.Filter;
	selection: SelectionType.Selection<TData>;
}
