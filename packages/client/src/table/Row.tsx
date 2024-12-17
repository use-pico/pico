import { Cell } from "./Cell";
import { TableCss } from "./TableCss";
import type { DataType } from "./type/DataType";
import type { RowType } from "./type/RowType";
import type { UseTable } from "./type/UseTable";

export namespace Row {
	export interface Props<TData extends DataType.Data> extends TableCss.Props {
		table: UseTable<TData>;
		row: RowType.Row<TData>;
	}
}

export const Row = <TData extends DataType.Data>({
	table,
	row: { id, cells },
	variant,
	tva = TableCss,
	css,
}: Row.Props<TData>) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<tr className={tv.tr()}>
			{cells.map((cell) => {
				return (
					<Cell
						key={`${id}-${cell.column.id}`}
						table={table}
						cell={cell}
						variant={variant}
						tva={tva}
						css={css}
					/>
				);
			})}
		</tr>
	);
};
