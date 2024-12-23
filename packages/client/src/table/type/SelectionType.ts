import { type MouseEvent } from "react";
import type { DataType } from "./DataType";
import type { RowType } from "./RowType";

export namespace SelectionType {
	export interface Selection<TData extends DataType.Data> {
		enabled: boolean;
		selection: Map<string, TData>;
		isSelected(row: RowType.Row<TData>): boolean;
		withRowSelectionHandler(
			row: RowType.Row<TData>,
		): (event: MouseEvent<HTMLElement>) => void;
	}
}
