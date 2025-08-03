import type { EntitySchema } from "@use-pico/common";
import type { Table } from "./Table";
import type { TableCls } from "./TableCls";

export namespace Cell {
	export interface Props<TData extends EntitySchema.Type, TContext = any> {
		cell: Table.Cell<TData, any, TContext>;
		// filter?: FilterType.Filter;
		slots: TableCls.Slots;
	}
}

export const Cell = <TData extends EntitySchema.Type, TContext = any>({
	cell: { column, data, value, context },
	// filter,
	slots,
}: Cell.Props<TData, TContext>) => {
	const { render: Render } = column;
	// const Filter = column?.filter?.component;

	return (
		<div className={slots.cell()}>
			<Render
				data={data}
				value={value}
				context={context}
			/>
			{/* {Filter && filter && column.filter ? (
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
			) : null} */}
		</div>
	);
};
