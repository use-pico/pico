import { Icon } from "../icon/Icon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
import { Cell } from "./Cell";
import type { TableCls } from "./TableCls";
import type { ActionType } from "./type/ActionType";
import type { DataType } from "./type/DataType";
import type { FilterType } from "./type/FilterType";
import type { RowType } from "./type/RowType";
import type { SelectionType } from "./type/SelectionType";

export namespace Row {
	export interface Props<TData extends DataType.Data, TContext = any> {
		props: RowType.Props<TData> | undefined;
		withActions: boolean;
		filter: FilterType.Filter | undefined;
		selection: SelectionType.Selection | undefined;
		row: RowType.Row<TData>;
		/**
		 * Row-wise action.
		 */
		actionRow: ActionType.Row.Component<TData, TContext> | undefined;
		/**
		 * Explicit control over the row action visibility.
		 */
		actionRowHidden: boolean;
		context: TContext | undefined;
		grid: string;
		slots: TableCls.Slots;
	}
}

export const Row = <TData extends DataType.Data>({
	props,
	withActions,
	filter,
	selection,
	row,
	actionRow: RowAction,
	actionRowHidden,
	context,
	grid,
	slots,
}: Row.Props<TData>) => {
	return (
		<div
			className={slots.tr({
				css: props?.css?.(row),
				selected: selection?.isSelected(row),
			})}
			style={{
				gridTemplateColumns: grid,
			}}
			onDoubleClick={() => {
				props?.onDoubleClick
					? props.onDoubleClick({
							row,
							data: row.data,
						})
					: selection?.event.onSelect(row);
			}}
		>
			{withActions ? (
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
							css={{
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
					{RowAction && !actionRowHidden ? (
						<RowAction
							data={row.data}
							context={context}
						/>
					) : null}
				</div>
			) : null}

			{row.cells.map((cell) => {
				return (
					<Cell
						key={`${row.id}-${cell.column.name}`}
						cell={cell}
						slots={slots}
						filter={filter}
						context={context}
					/>
				);
			})}
		</div>
	);
};
