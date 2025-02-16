import { type MouseEvent } from "react";
import type { DataType } from "./DataType";
import type { RowType } from "./RowType";

export namespace SelectionType {
	export interface Selection<TData extends DataType.Data> {
		enabled: boolean;
		/**
		 * Selected IDs.
		 */
		selection: string[];
		/**
		 * Single-selection mode.
		 */
		isSingle: boolean;
		/**
		 * Multi-selection mode.
		 */
		isMulti: boolean;
		/**
		 * Check if the given row is selected.
		 */
		isSelected(row: RowType.Row<TData>): boolean;
		/**
		 * Are the all (visible) rows selected?
		 */
		isAll(): boolean;
		/**
		 * Are any (visible) rows selected?
		 */
		isAny(): boolean;
		withRowHandler(
			row: RowType.Row<TData>,
		): (event: MouseEvent<HTMLElement>) => void;
		withAllHandler(): (event: MouseEvent<HTMLElement>) => void;
	}
}
