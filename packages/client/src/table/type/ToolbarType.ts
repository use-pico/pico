import type { FC } from "react";
import type { SelectionType } from "./SelectionType";

export namespace ToolbarType {
	export interface Props<TContext = any> {
		selection?: SelectionType.Selection;
		context?: TContext;
	}

	export type Component<TContext = any> = FC<Props<TContext>>;
}
