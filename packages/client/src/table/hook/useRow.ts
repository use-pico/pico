import { type EntitySchema, pathOf } from "@use-pico/common";
import { v4 } from "uuid";
import type { Table } from "../Table";

export namespace useRow {
	export interface Props<TData extends EntitySchema.Type, TContext = any> {
		data: TData;
		visible: Table.Column.Props<TData, any, TContext>[];
		context: TContext;
	}
}

export const useRow = <TData extends EntitySchema.Type, TContext = any>({
	data,
	visible,
	context,
}: useRow.Props<TData, TContext>): Table.Row<TData, TContext> => {
	return {
		id: v4(),
		data,
		cells: visible.map((column) => {
			return {
				column,
				data,
				value: pathOf(data).get(column.name),
				context,
			} satisfies Table.Cell<TData, any, TContext>;
		}),
		context,
	} satisfies Table.Row<TData, TContext>;
};
