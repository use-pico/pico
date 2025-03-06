import type { FC } from "react";
import type { DataType } from "./DataType";

export namespace ActionType {
	export namespace Table {
		export interface Props<TContext = any> {
			context?: TContext;
		}

		export type Component<TContext = any> = FC<Props<TContext>>;
	}

	export namespace Row {
		export interface Props<TData extends DataType.Data, TContext = any> {
			data: TData;
			context?: TContext;
		}

		export type Component<TData extends DataType.Data, TContext = any> = FC<
			Props<TData, TContext>
		>;
	}

	export interface Props<TData extends DataType.Data, TContext = any> {
		/**
		 * Table-wise action.
		 */
		table?: Table.Component<TContext>;
		/**
		 * Table row action.
		 */
		row?: Row.Component<TData, TContext>;
	}
}
