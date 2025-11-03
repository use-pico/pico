import { tvc } from "@use-pico/cls";
import type { EntitySchema, withQuerySchema } from "@use-pico/common/schema";
import type { FC } from "react";
import type { useSelection } from "../../hook/useSelection";
import { Icon } from "../../icon/Icon";
import { SelectionOffIcon } from "../../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../../icon/SelectionOnIcon";
import { Cell } from "./Cell";
import { useRow } from "./hook/useRow";
import type { Table } from "./Table";
import type { TableCls } from "./TableCls";

export namespace Row {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> {
		item: TData;
		visibleColumns: Table.Column.Props<TQuery, TData, any, TContext>[];
		selection: useSelection.Selection<TData> | undefined;
		filter: Table.Filter.State<TQuery> | undefined;
		rowCls: Table.Row.Cls.Fn<TData, TContext> | undefined;
		rowDblClick: Table.Row.DblClick.Fn<TData, TContext> | undefined;
		/**
		 * Row-wise action.
		 */
		actionRow: Table.Action.Row.RenderFn<TData, TContext> | undefined;
		controlsHidden: Table.Controls[];
		context: TContext;
		grid: string;
		slots: TableCls.Slots;
		onDoubleClick?(props: { data: TData; context: TContext }): void;
	}

	export type Component<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> = FC<Props<TQuery, TData, TContext>>;
}

export const Row = <
	TQuery extends withQuerySchema.Query,
	TData extends EntitySchema.Type,
	TContext = any,
>({
	item,
	visibleColumns,
	selection,
	filter,
	rowCls,
	actionRow,
	controlsHidden,
	context,
	grid,
	slots,
	rowDblClick,
}: Row.Props<TQuery, TData, TContext>) => {
	const row = useRow<TQuery, TData, TContext>({
		data: item,
		visible: visibleColumns,
		context,
	});

	const isSelected = selection?.isSelected(item.id);

	return (
		<div
			data-ui="Table-row"
			className={slots.row({
				variant: {
					selected: isSelected,
				},
				slot: {
					row: {
						class: rowCls?.({
							data: row.data,
							context,
						}),
					},
				},
			})}
			style={{
				gridTemplateColumns: grid,
			}}
			onDoubleClick={() => {
				selection?.toggle(item);
				rowDblClick?.({
					data: row.data,
					context,
				});
			}}
		>
			<div
				className={tvc([
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
					"gap-2",
				])}
			>
				{selection ? (
					<Icon
						icon={isSelected ? SelectionOnIcon : SelectionOffIcon}
						size={"sm"}
						tweak={{
							slot: {
								root: {
									class: slots.select({
										variant: {
											selected: isSelected,
										},
									}),
								},
							},
						}}
						onClick={() => {
							selection?.toggle(item);
						}}
					/>
				) : null}
				{controlsHidden.includes("actions")
					? null
					: actionRow?.({
							data: row.data,
							context,
						})}
			</div>

			{row.cells.map((cell) => {
				return (
					<Cell
						key={`${item.id}-${cell.column.name}`}
						cell={cell}
						slots={slots}
						filter={filter}
					/>
				);
			})}
		</div>
	);
};
