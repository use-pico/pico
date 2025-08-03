import type { EntitySchema } from "@use-pico/common";
import type { FC } from "react";
import { Cell } from "./Cell";
import { useRow } from "./hook/useRow";
import type { Table } from "./Table";
import type { TableCls } from "./TableCls";

export namespace Row {
	export interface Props<TData extends EntitySchema.Type, TContext = any> {
		item: TData;
		visibleColumns: Table.Column.Props<TData, any, TContext>[];
		// props: Table.Row<TData> | undefined;
		// withActions: boolean;
		// filter: FilterType.Filter | undefined;
		// selection: SelectionType.Selection | undefined;

		/**
		 * Row-wise action.
		 */
		// actionRow: ActionType.Row.Table<TData, TContext> | undefined;
		// controlsHidden: Table.Controls[];
		context: TContext;
		grid: string;
		slots: TableCls.Slots;
	}

	export type Component<TData extends EntitySchema.Type, TContext = any> = FC<
		Props<TData, TContext>
	>;
}

export const Row = <TData extends EntitySchema.Type, TContext = any>({
	item,
	visibleColumns,
	// props,
	// withActions,
	// filter,
	// selection,
	// actionRow,
	// controlsHidden,
	context,
	grid,
	slots,
}: Row.Props<TData, TContext>) => {
	// const { action: RowAction } = actionRow ?? {
	// 	RowAction: undefined,
	// };

	const row = useRow<TData, TContext>({
		data: item,
		visible: visibleColumns,
		context,
	});

	return (
		<div
			className={slots.row(
				{
					// selected: selection?.isSelected(row),
				},
				// props?.css?.(row),
			)}
			style={{
				gridTemplateColumns: grid,
			}}
			// onDoubleClick={() => {
			// 	props?.onDoubleClick
			// 		? props.onDoubleClick({
			// 				row,
			// 				data: row.data,
			// 			})
			// 		: selection?.event.onSelect(row);
			// }}
		>
			{/* {withActions ? (
				<div
					className={
						"flex flex-row items-center justify-between gap-2"
					}
				>
					{selection ? (
						<Icon
							icon={
								selection.isSelected(row)
									? SelectionOnIcon
									: SelectionOffIcon
							}
							cls={{
								base: slots.select({
									selected: selection.isSelected(row),
								}),
							}}
							variant={{
								size: "2xl",
							}}
							onClick={() => selection.event.onSelect(row)}
						/>
					) : null}
					{RowAction && !controlsHidden.includes("action-row") ? (
						<RowAction
							data={row.data}
							context={context}
						/>
					) : null}
				</div>
			) : null} */}

			{row.cells.map((cell) => {
				return (
					<Cell
						key={`${row.id}-${cell.column.name}`}
						cell={cell}
						slots={slots}
						// filter={filter}
						context={context}
					/>
				);
			})}
		</div>
	);
};
