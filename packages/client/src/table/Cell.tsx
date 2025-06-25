import { tvc } from "@use-pico/common";
import type { TableCls } from "./TableCls";
import type { CellType } from "./type/CellType";
import type { DataType } from "./type/DataType";
import type { FilterType } from "./type/FilterType";

export namespace Cell {
	export interface Props<TData extends DataType.Data, TContext = any> {
		cell: CellType.Cell<TData, any>;
		filter?: FilterType.Filter;
		context?: TContext;
		slots: TableCls.Slots;
	}
}

export const Cell = <TData extends DataType.Data, TContext = any>({
	cell: { column, data, value },
	filter,
	context,
	slots,
}: Cell.Props<TData, TContext>) => {
	const { render: Render } = column;
	const Filter = column?.filter?.component;

	return (
		<div className={slots.td()}>
			<Render
				data={data}
				value={value}
				context={context}
			/>
			{Filter && filter && column.filter ? (
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
			) : null}
		</div>
	);
};
