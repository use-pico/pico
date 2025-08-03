import { useMemo } from "react";
import type { Table } from "../Table";

export namespace useGrid {
	export interface Props {
		visible: Table.Column.Props<any, any, any>[];
	}
}

export const useGrid = ({ visible }: useGrid.Props) => {
	// biome-ignore lint/correctness/useExhaustiveDependencies: Those values are defaults, so they won't change until the table is re-mounted.
	return useMemo(() => {
		return visible
			.map((col) =>
				!col.size || col.size === "auto" ? "1fr" : `${col.size}rem`,
			)
			.join(" ");
	}, []);
};
