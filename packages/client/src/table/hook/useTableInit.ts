import { type DeepKeys, pathOf } from "@use-pico/common";
import { v4 } from "uuid";
import { TableCls } from "../TableCls";
import { wrapFilter } from "../tools/wrapFilter";
import { wrapSelection } from "../tools/wrapSelection";
import { wrapSort } from "../tools/wrapSort";
import type { CellType } from "../type/CellType";
import type { ColumnType } from "../type/ColumnType";
import type { DataType } from "../type/DataType";
import type { FilterType } from "../type/FilterType";
import type { RowType } from "../type/RowType";
import type { SelectionType } from "../type/SelectionType";
import type { SortType } from "../type/SortType";

export namespace useTableInit {
	export interface Props<TData extends DataType.Data, TContext = any>
		extends TableCls.Props {
		data: TData[] | undefined;
		columns: ColumnType.Props<TData, any, TContext>[];
		visible: DeepKeys<TData>[] | undefined;
		hidden: DeepKeys<TData>[] | undefined;
		order: DeepKeys<TData>[] | undefined;
		filter: FilterType.Table | undefined;
		selection: SelectionType.Table | undefined;
		sort: SortType.Table | undefined;
		withActions: boolean;
	}
}

export const useTableInit = <TData extends DataType.Data, TContext = any>({
	data = [],
	columns,
	visible,
	hidden = [],
	order = [],
	filter,
	selection,
	sort,
	withActions,
	variant,
	tva = TableCls,
	css,
}: useTableInit.Props<TData, TContext>) => {
	const { slots } = tva({
		...variant,
		css,
	});

	const $selection = wrapSelection<TData>({
		props: selection,
		data,
	});
	const $filter = wrapFilter<TData, any, TContext>({
		props: filter,
		columns,
	});
	const $sort = wrapSort({
		props: sort,
	});

	const $visible = columns
		.filter((column) => {
			if (!visible) {
				return !hidden.includes(column.name);
			}
			return (
				visible.includes(column.name) && !hidden.includes(column.name)
			);
		})
		.sort((a, b) => {
			const indexA = order.indexOf(a.name);
			const indexB = order.indexOf(b.name);
			return (
				(indexA === -1 ? Infinity : indexA) -
				(indexB === -1 ? Infinity : indexB)
			);
		});

	const $rows = data?.map((data) => {
		return {
			id: v4(),
			data,
			cells: $visible.map((column) => {
				return {
					column,
					data,
					value: pathOf(data).get(column.name),
				} satisfies CellType.Cell<TData, any, TContext>;
			}),
		} satisfies RowType.Row<TData, TContext>;
	});

	const grid = $visible
		.map((col) =>
			!col.size || col.size === "auto" ? "1fr" : `${col.size}rem`,
		)
		.join(" ");

	return {
		filter: $filter,
		selection: $selection,
		sort: $sort,
		visible: $visible,
		rows: $rows,
		grid: withActions ? `auto ${grid}` : grid,
		slots,
	} as const;
};
