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
		action?: ActionType.Props<TData>;
		context?: TContext;
	}
}

export const Row = <TData extends DataType.Data>({
	props,
	filter,
	selection,
	row,
	action,
	context,
	variant,
	tva = TableCss,
	css,
}: Row.Props<TData>) => {
	const tv = tva({ ...variant, css }).slots;
	const TableAction = action?.table;
	const RowAction = action?.row;

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
			{TableAction || RowAction || selection ?
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
						{RowAction ?
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
