import type { EntitySchema } from "@use-pico/common";
import type { FC } from "react";
import type { SelectionType } from "./SelectionType";

export namespace ToolbarType {
	export interface Props<TData extends EntitySchema.Type, TContext = any> {
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

	export type Component<TData extends EntitySchema.Type, TContext = any> = FC<
		Props<TData, TContext>
	>;
}
