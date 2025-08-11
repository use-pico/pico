import { tvc } from "@use-pico/cls";
import type { EntitySchema, withQuerySchema } from "@use-pico/common";
import type { FC } from "react";
import { match, P } from "ts-pattern";
import { Icon } from "../icon/Icon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
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
		selection: Table.Selection.State | undefined;
		selectionMode: "single" | "multi";
		filter: Table.Filter.State<TQuery> | undefined;
		rowCls: Table.Row.Cls.Fn<TData, TContext> | undefined;
		rowDblClick: Table.Row.DblClick.Fn<TData, TContext> | undefined;
		/**
		 * Row-wise action.
		 */
		actionRow: Table.Action.Row.Render<TData, TContext> | undefined;
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
	selectionMode,
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

	const onSelect = () => {
		match(selectionMode)
			.with("single", () => {
				const selected = selection?.value.includes(item.id);
				selection?.set(
					selected
						? []
						: [
								item.id,
							],
				);
			})
			.with("multi", () => {
				const selected = selection?.value.includes(item.id);
				selection?.set(
					selected
						? selection.value.filter((id) => id !== item.id)
						: [
								...selection.value,
								item.id,
							],
				);
			})
			.with(P.nullish, () => {
				//
			})
			.exhaustive();
	};

	const isSelected = selection?.value.includes(item.id);

	return (
		<div
			className={slots.row(({ what }) => ({
				variant: what.variant({
					selected: isSelected,
				}),
				slot: {
					row: what.css(
						rowCls?.({
							data: row.data,
							context,
						}),
					),
				},
			}))}
			style={{
				gridTemplateColumns: grid,
			}}
			onDoubleClick={() => {
				onSelect();
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
						cls={({ what }) => ({
							slot: {
								base: what.css(
									slots.select(({ what }) => ({
										variant: what.variant({
											selected: isSelected,
										}),
									})),
								),
							},
							variant: what.variant({
								size: "2xl",
							}),
						})}
						onClick={onSelect}
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
