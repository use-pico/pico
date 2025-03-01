import { tvc } from "@use-pico/common";
import { TableCss } from "./TableCss";
import type { CellType } from "./type/CellType";
import type { DataType } from "./type/DataType";
import type { UseTable } from "./type/UseTable";

export namespace Cell {
	export interface Props<TData extends DataType.Data> extends TableCss.Props {
		table: UseTable<TData>;
		cell: CellType.Cell<TData, any>;
	}
}

export const Cell = <TData extends DataType.Data>({
	table,
	cell: { column, data, value },
	variant,
	tva = TableCss,
	css,
}: Cell.Props<TData>) => {
	const Render = column.def.render;
	const Filter = column.def.filter?.component;
	const tv = tva({ ...variant, css }).slots;

	return (
		<td
			className={tv.td()}
			style={
				column.def.size ?
					{
						maxWidth: `${column.def.size}rem`,
						width: `${column.def.size}rem`,
					}
				:	undefined
			}
		>
			<div className={"group flex flex-row items-center gap-2 justify-between"}>
				<Render
					table={table}
					data={data}
					value={value}
					context={table.context}
				/>
				{Filter && column.filter ?
					<div
						className={tvc([
							"group-hover:visible",
							"invisible",
							"opacity-50 hover:opacity-100",
							"cursor-pointer",
						])}
					>
						<Filter
							filter={column.filter}
							data={data}
						/>
					</div>
				:	null}
			</div>
		</td>
	);
};
