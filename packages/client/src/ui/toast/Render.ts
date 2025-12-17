import type { ReactNode } from "react";
import type { Toast } from "./Toast";

export namespace Render {
	export interface Props {
		/**
		 * The toast itself
		 */
		toast: Toast;
	}

	export type Fn = (props: Props) => ReactNode;
}
