import type { CellType } from "./CellType";
import type { DataType } from "./DataType";

export namespace RowType {
	export interface Row<TData extends DataType.Data> {
		id: string;
		data: TData;
		cells: CellType.Cell<TData, any>[];
	}
}
