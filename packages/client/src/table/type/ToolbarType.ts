import type { FC } from "react";
import type { DataType } from "./DataType";
import type { SelectionType } from "./SelectionType";

export namespace ToolbarType {
	export interface Props<TData extends DataType.Data, TContext = any> {
		/**
		 * Access to current data available in the table
		 */
		data: TData[];
		/**
		 * Access to current selection instance
		 */
		selection?: SelectionType.Selection;
		/**
		 * Context, if any
		 */
		context?: TContext;
	}

	export type Component<TData extends DataType.Data, TContext = any> = FC<
		Props<TData, TContext>
	>;
}
