import { pathOf, type DeepKeys } from "@use-pico/common";
import { v4 } from "uuid";
import type { CellType } from "./type/CellType";
import type { ColumnType } from "./type/ColumnType";
import type { DataType } from "./type/DataType";
import type { FilterType } from "./type/FilterType";
import type { RowType } from "./type/RowType";
import type { UseTable } from "./type/UseTable";

export namespace useTable {
	export interface Filter {
		value: Record<string, any> | undefined;
		set(value: Record<string, any>): void;
	}

	export interface Props<TData extends DataType.Data> {
		/**
		 * Column definition for the table.
		 *
		 * This must be stable reference to prevent this hook to trigger re-renders.
		 */
		columns: ColumnType.Def<TData, any>[];
		/**
		 * Order of columns; by default, columns are ordered by definition order.
		 *
		 * Should be stable reference or row would get recomputed.
		 */
		order?: DeepKeys<TData>[];
		hidden?: DeepKeys<TData>[];
		visible?: DeepKeys<TData>[];
		data: TData[];
		filter?: Filter;
	}

	export type PropsEx<TData extends DataType.Data> = Omit<
		Props<TData>,
		"columns"
	>;
}

export const useTable = <TData extends DataType.Data>({
	columns,
	order = columns.map((column) => column.name),
	hidden = [],
	visible = columns.map((column) => column.name),
	data,
	filter,
}: useTable.Props<TData>): UseTable<TData> => {
	const $filter = { ...(filter?.value || {}) };
	const pathOfFilter = pathOf($filter || {});

	const $columns: ColumnType.Column<TData, any>[] = columns.map((column) => {
		return {
			id: v4(),
			def: column,
			filter:
				column.filter ?
					({
						is() {
							return column.filter ?
									pathOfFilter.get(column.filter.path) !== undefined
								:	false;
						},
						reset() {
							column.filter && pathOfFilter.set(column.filter.path, undefined);
							filter?.set({ ...$filter });
						},
						shallow(path, value) {
							column.filter && pathOfFilter.set(path, value);
							filter?.set({ ...$filter });
						},
						set(value) {
							filter?.set({ ...value });
						},
					} satisfies FilterType.Filter)
				:	undefined,
		};
	});

	const $visible = $columns
		.filter((column) => {
			return (
				visible.includes(column.def.name) && !hidden.includes(column.def.name)
			);
		})
		.sort((a, b) => {
			const indexA = order.indexOf(a.def.name);
			const indexB = order.indexOf(b.def.name);
			return (
				(indexA === -1 ? Infinity : indexA) -
				(indexB === -1 ? Infinity : indexB)
			);
		});

	return {
		columns: $columns,
		visible: $visible,
		rows: data?.map((data) => {
			return {
				id: v4(),
				data,
				cells: $visible.map((column) => {
					return {
						column,
						data,
						value: pathOf(data).get(column.def.name),
					} satisfies CellType.Cell<TData, any>;
				}),
			} satisfies RowType.Row<TData>;
		}),
		isEmpty: data.length === 0,
		filter: {
			is() {
				return $columns.some((column) => {
					return column.filter?.is();
				});
			},
			reset() {
				filter?.set({});
			},
			set(value) {
				filter?.set({ ...value });
			},
			shallow(path, value) {
				pathOfFilter.set(path, value);
			},
		},
	};
};
