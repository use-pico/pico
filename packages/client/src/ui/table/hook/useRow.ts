import type { EntitySchema, withQuerySchema } from "@use-pico/common/schema";
import pathOf from "object-path";
import { useId } from "react";
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
	const path = pathOf(data);
	const id = useId();

	return {
		id,
		data,
		cells: visible.map((column) => {
			return {
				column,
				data,
				value: path.get(column.name),
				context,
			} satisfies Table.Cell<TQuery, TData, any, TContext>;
		}),
		context,
	} satisfies Table.Row<TQuery, TData, TContext>;
};
