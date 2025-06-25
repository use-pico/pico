import type { FC } from "react";
import type { DataType } from "./DataType";
import type { SelectionType } from "./SelectionType";

export namespace ActionType {
	export namespace Table {
		export interface Props<TContext = any> {
			selection?: SelectionType.Selection;
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
}
