import { Icon } from "../icon/Icon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
import { Cell } from "./Cell";
import type { Table } from "./Table";
import { TableCss } from "./TableCss";
import type { DataType } from "./type/DataType";
import type { RowType } from "./type/RowType";
import type { UseTable } from "./type/UseTable";

export namespace Row {
	export interface Props<TData extends DataType.Data> extends TableCss.Props {
		table: UseTable<TData>;
		row: RowType.Row<TData>;
		action?: Table.Action<TData>;
	}
}

export const Row = <TData extends DataType.Data>({
	table,
	row,
	action,
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
				css: table.rowCss?.({ data: row.data }),
				selected: table.selection.isSelected(row),
			})}
			onDoubleClick={(e) => {
				if (table.onRowDoubleClick) {
					table.onRowDoubleClick({ row, data: row.data });
					return;
				}

				if (table.selection.enabled) {
					table.selection.withRowHandler(row)(e);
				}
			}}
		>
			{TableAction || RowAction || table.selection.enabled ?
				<td className={"w-0"}>
					<div className={"flex flex-row items-center gap-2"}>
						{table.selection.enabled ?
							<Icon
								icon={
									table.selection.isSelected(row) ? SelectionOnIcon : SelectionOffIcon
								}
								css={{
									base: tv.select({
										selected: table.selection.isSelected(row),
									}),
								}}
								variant={{
									size: "2xl",
								}}
								onClick={table.selection.withRowHandler(row)}
							/>
						:	null}
						{RowAction ?
							<RowAction
								table={table}
								data={row.data}
							/>
						:	null}
					</div>
				</td>
			:	null}

			{row.cells.map((cell) => {
				return (
					<Cell
						key={`${row.id}-${cell.column.id}`}
						table={table}
						cell={cell}
						variant={variant}
						tva={tva}
						css={css}
					/>
				);
			})}
			<td></td>
		</tr>
	);
};
