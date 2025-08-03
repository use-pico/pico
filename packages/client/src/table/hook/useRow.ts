import {
	type EntitySchema,
	pathOf,
	type withQuerySchema,
} from "@use-pico/common";
import { v4 } from "uuid";
import type { Table } from "../Table";

export namespace useRow {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> {
		data: TData;
		visible: Table.Column.Props<TQuery, TData, any, TContext>[];
		context: TContext;
	}
}

export const useRow = <
	TQuery extends withQuerySchema.Query,
	TData extends EntitySchema.Type,
	TContext = any,
>({
	data,
	visible,
	context,
}: useRow.Props<TQuery, TData, TContext>): Table.Row<
	TQuery,
	TData,
	TContext
> => {
	return {
		id: v4(),
		data,
		cells: visible.map((column) => {
			return {
				column,
				data,
				value: pathOf(data).get(column.name),
				context,
			} satisfies Table.Cell<TQuery, TData, any, TContext>;
		}),
		context,
	} satisfies Table.Row<TQuery, TData, TContext>;
};
