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

	export interface Selection {
		type: "single" | "multi";
		value: string[];
		set(selection: string[]): void;
	}

	export interface Props<TData extends DataType.Data, TContext = any> {
		/**
		 * Column definition for the table.
		 *
		 * This must be stable reference to prevent this hook to trigger re-renders.
		 */
		columns: ColumnType.Def<TData, any, TContext>[];
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
		selection?: Selection;
		context?: TContext;
		rowCss?: UseTable.RowCssCallback<TData>;
		/**
		 * If you need to do something when a row is double-clicked.
		 */
		onRowDoubleClick?: UseTable.OnRowDoubleClick<TData>;
	}

	export type PropsEx<TData extends DataType.Data, TContext = any> = Omit<
		Props<TData, TContext>,
		"columns"
	>;
}

export const useTable = <TData extends DataType.Data, TContext = any>({
	columns,
	order = columns.map((column) => column.name),
	hidden = [],
	visible = columns.map((column) => column.name),
	data,
	filter,
	selection,
	context,
	rowCss,
	onRowDoubleClick,
}: useTable.Props<TData, TContext>): UseTable<TData, TContext> => {
	const $filter = { ...(filter?.value || {}) };
	const pathOfFilter = pathOf($filter || {});
	const $selection = new Set<string>(selection?.value);

	const $columns: ColumnType.Column<TData, any, TContext>[] = columns.map(
		(column) => {
			return {
				id: v4(),
				def: column,
				filter:
					column.filter ?
						({
							value: $filter,
							is() {
								return column.filter?.is ?
										column.filter.is({ value: $filter })
									:	false;
							},
							reset() {
								column.filter?.clear({ filter: this });
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
		},
	);

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
		data,
		columns: $columns,
		visible: $visible,
		rowCss,
		rows: data?.map((data) => {
			return {
				id: v4(),
				data,
				cells: $visible.map((column) => {
					return {
						column,
						data,
						value: pathOf(data).get(column.def.name),
					} satisfies CellType.Cell<TData, any, TContext>;
				}),
			} satisfies RowType.Row<TData, TContext>;
		}),
		isEmpty: data.length === 0,
		filter: {
			value: $filter,
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
		selection: {
			enabled: Boolean(selection) && data.length > 0,
			selection: Array.from($selection),
			isSingle: selection?.type === "single",
			isMulti: selection?.type === "multi",
			isSelected({ data }) {
				return $selection.has(data.id) || false;
			},
			isAll() {
				return data.every((data) => $selection.has(data.id));
			},
			isAny() {
				return data.some((data) => $selection.has(data.id));
			},
			withRowHandler({ data }) {
				return () => {
					if (selection?.type === "single") {
						const selected = $selection.has(data.id);
						$selection.clear();
						selected ? $selection.delete(data.id) : $selection.add(data.id);
					} else {
						$selection.has(data.id) ?
							$selection.delete(data.id)
						:	$selection.add(data.id);
					}

					selection?.set(Array.from($selection));
				};
			},
			withAllHandler() {
				return () => {
					if (data.every((data) => $selection.has(data.id))) {
						$selection.clear();
					} else {
						data.forEach(({ id }) => $selection.add(id));
					}

					selection?.set(Array.from($selection));
				};
			},
		},
		context: context as TContext,
		onRowDoubleClick,
	};
};
