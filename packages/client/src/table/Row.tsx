import { Icon } from "../icon/Icon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
import { Cell } from "./Cell";
import { TableCss } from "./TableCss";
import type { ActionType } from "./type/ActionType";
import type { DataType } from "./type/DataType";
import type { FilterType } from "./type/FilterType";
import type { RowType } from "./type/RowType";
import type { SelectionType } from "./type/SelectionType";

export namespace Row {
	export interface Props<TData extends DataType.Data, TContext = any>
		extends TableCss.Props {
		props?: RowType.Props<TData>;
		filter?: FilterType.Filter;
		selection?: SelectionType.Selection;
		row: RowType.Row<TData>;
		/**
		 * Table-wise action.
		 */
		actionTable?: ActionType.Table.Component<TContext>;
		/**
		 * Explicit control over the table action visibility.
		 */
		actionTableHidden: boolean;
		/**
		 * Row-wise action.
		 */
		actionRow?: ActionType.Row.Component<TData, TContext>;
		/**
		 * Explicit control over the row action visibility.
		 */
		actionRowHidden: boolean;
		context?: TContext;
	}
}

export const Row = <TData extends DataType.Data>({
	props,
	filter,
	selection,
	row,
	actionTable: TableAction,
	actionTableHidden,
	actionRow: RowAction,
	actionRowHidden,
	context,
	variant,
	tva = TableCss,
	css,
}: Row.Props<TData>) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<tr
			className={tv.tr({
				css: props?.css?.(row),
				selected: selection?.isSelected(row),
			})}
			onDoubleClick={() => {
				if (props?.onDoubleClick) {
					props.onDoubleClick({ row, data: row.data });
					return;
				}

				selection?.event.onSelect(row);
			}}
		>
			{(
				(TableAction && !actionTableHidden) ||
				(RowAction && !actionRowHidden) ||
				selection
			) ?
				<td className={"w-0"}>
					<div className={"flex flex-row items-center gap-2"}>
						{selection ?
							<Icon
								icon={
									selection.isSelected(row) ? SelectionOnIcon : SelectionOffIcon
								}
								css={{
									base: tv.select({
										selected: selection.isSelected(row),
									}),
								}}
								variant={{
									size: "2xl",
								}}
								onClick={() => selection.event.onSelect(row)}
							/>
						:	null}
						{RowAction && !actionRowHidden ?
							<RowAction data={row.data} />
						:	null}
					</div>
				</td>
			:	null}

			{row.cells.map((cell) => {
				return (
					<Cell
						key={`${row.id}-${cell.column.name}`}
						cell={cell}
						variant={variant}
						tva={tva}
						css={css}
						filter={filter}
						context={context}
					/>
				);
			})}
			<td></td>
		</tr>
	);
};
