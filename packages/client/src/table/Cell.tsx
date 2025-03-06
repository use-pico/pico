import { tvc } from "@use-pico/common";
import { TableCss } from "./TableCss";
import type { CellType } from "./type/CellType";
import type { DataType } from "./type/DataType";
import type { FilterType } from "./type/FilterType";

export namespace Cell {
	export interface Props<TData extends DataType.Data, TContext = any>
		extends TableCss.Props {
		cell: CellType.Cell<TData, any>;
		filter?: FilterType.Filter;
		context?: TContext;
	}
}

export const Cell = <TData extends DataType.Data, TContext = any>({
	cell: { column, data, value },
	filter,
	context,
	variant,
	tva = TableCss,
	css,
}: Cell.Props<TData, TContext>) => {
	const { render: Render } = column;
	const Filter = column?.filter?.component;
	const tv = tva({ ...variant, css }).slots;

	return (
		<td
			className={tv.td()}
			style={
				column.size ?
					{
						maxWidth: `${column.size}rem`,
						width: `${column.size}rem`,
					}
				:	undefined
			}
		>
			<div className={"group flex flex-row items-center gap-2 justify-between"}>
				<Render
					data={data}
					value={value}
					context={context}
				/>
				{Filter && filter && column.filter ?
					<div
						className={tvc([
							"group-hover:visible",
							"invisible",
							"opacity-50 hover:opacity-100",
							"cursor-pointer",
						])}
					>
						<Filter
							filter={filter}
							data={data}
						/>
					</div>
				:	null}
			</div>
		</td>
	);
};
