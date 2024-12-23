import { Icon } from "../icon/Icon";
import { SelectionOff } from "../icon/SelectionOff";
import { SelectionOn } from "../icon/SelectionOn";
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
		<tr className={tv.tr()}>
			{table.selection.enabled ?
				<td className={"w-0"}>
					<Icon
						icon={table.selection.isSelected(row) ? SelectionOn : SelectionOff}
						onClick={table.selection.withRowSelectionHandler(row)}
					/>
				</td>
			:	null}
			{TableAction || RowAction ?
				<td className={"w-0"}>
					{RowAction ?
						<RowAction
							table={table}
							data={row.data}
						/>
					:	null}
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
