import { type EntitySchema, tvc, type withQuerySchema } from "@use-pico/common";
import type { Table } from "./Table";
import type { TableCls } from "./TableCls";

export namespace Cell {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> {
		cell: Table.Cell<TQuery, TData, any, TContext>;
		filter: Table.Filter.State<TQuery["filter"]> | undefined;
		slots: TableCls.Slots;
	}
}

export const Cell = <
	TQuery extends withQuerySchema.Query,
	TData extends EntitySchema.Type,
	TContext = any,
>({
	cell: { column, data, value, context },
	filter,
	slots,
}: Cell.Props<TQuery, TData, TContext>) => {
	const { render: Render } = column;
	const Filter = column?.filter?.component;

	return (
		<div className={slots.cell()}>
			<Render
				data={data}
				value={value}
				context={context}
			/>
			{Filter && column.filter && filter ? (
				<div
					className={tvc([
						"group-hover:visible",
						"invisible",
						"opacity-50 hover:opacity-100",
						"cursor-pointer",
					])}
				>
					<Filter
						data={data}
						state={filter}
						{...column.filter}
					/>
				</div>
			) : null}
		</div>
	);
};
