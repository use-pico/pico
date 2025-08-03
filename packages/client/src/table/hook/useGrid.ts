import { useMemo } from "react";
import type { Table } from "../Table";

export namespace useGrid {
	export interface Props {
		visible: Table.Column.Props<any, any, any>[];
		actionWidth?: string;
		/**
		 * In this case we don't care about the selection type, it's just to check if
		 * there is "any" selection, so we can compute grid accordingly.
		 */
		selection: any | undefined;
	}
}

export const useGrid = ({
	visible,
	actionWidth = "auto",
	selection,
}: useGrid.Props) => {
	// biome-ignore lint/correctness/useExhaustiveDependencies: Those values are defaults, so they won't change until the table is re-mounted.
	return useMemo(() => {
		const grid = visible
			.map((col) =>
				!col.size || col.size === "auto" ? "1fr" : `${col.size}rem`,
			)
			.join(" ");

		if (selection) {
			return `${actionWidth} ${grid}`;
		}

		return grid;
	}, []);
};
