import { type MouseEvent } from "react";
import type { DataType } from "./DataType";
import type { RowType } from "./RowType";

export namespace SelectionType {
	export interface Selection<TData extends DataType.Data> {
		enabled: boolean;
		selection: string[];
		isSingle: boolean;
		isMulti: boolean;
		isSelected(row: RowType.Row<TData>): boolean;
		isAll(): boolean;
		isAny(): boolean;
		withRowHandler(
			row: RowType.Row<TData>,
		): (event: MouseEvent<HTMLElement>) => void;
		withAllHandler(): (event: MouseEvent<HTMLElement>) => void;
	}
}
