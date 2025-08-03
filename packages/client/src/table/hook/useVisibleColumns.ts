import type { DeepKeys, EntitySchema } from "@use-pico/common";
import { useMemo } from "react";
import type { Table } from "../Table";

export namespace useVisibleColumns {
	export interface Props<TData extends EntitySchema.Type> {
		columns: Table.Column.Props<TData, any, any>[];
		visible: DeepKeys<TData>[] | undefined;
		hidden: DeepKeys<TData>[] | undefined;
		order: DeepKeys<TData>[] | undefined;
	}
}

export const useVisibleColumns = <TData extends EntitySchema.Type>({
	columns,
	visible = [],
	hidden = [],
	order = [],
}: useVisibleColumns.Props<TData>) => {
	// biome-ignore lint/correctness/useExhaustiveDependencies: Those values are defaults, so they won't change until the table is re-mounted.
	return useMemo(() => {
		// Convert arrays to Sets for O(1) lookup performance
		const hiddenSet = new Set(hidden);
		const visibleSet = new Set(visible);

		return columns
			.filter((column) => {
				// Hidden takes precedence over visible
				if (hiddenSet.has(column.name)) {
					return false;
				}
				// If no visible columns specified, show all non-hidden
				if (visibleSet.size === 0) {
					return true;
				}
				// Otherwise, only show if in visible set
				return visibleSet.has(column.name);
			})
			.sort((a, b) => {
				const orderMap = new Map(
					order.map((name, index) => [
						name,
						index,
					]),
				);
				const indexA = orderMap.get(a.name) ?? Infinity;
				const indexB = orderMap.get(b.name) ?? Infinity;
				return indexA - indexB;
			});
	}, []);
};
