import { useParams } from "@tanstack/react-router";
import { LinkTo, Table, Tx, useTable, withColumn } from "@use-pico/client";
import type { FC } from "react";
import type { ItemSchema } from "~/app/derivean/item/schema/ItemSchema";

const column = withColumn<ItemSchema.Type>();

const columns = [
	column({
		name: "name",
		header() {
			return "Item name (label)";
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/item/$id/view"}
					params={{ locale, id: data.id }}
				>
					<Tx label={`Item name - ${value}`} />
				</LinkTo>
			);
		},
		size: 14,
	}),
];

export namespace ItemTable {
	export interface Props extends Table.PropsEx<ItemSchema.Type> {
		//
	}
}

export const ItemTable: FC<ItemTable.Props> = ({ table, ...props }) => {
	return (
		<Table
			table={useTable({
				...table,
				columns,
			})}
			{...props}
		/>
	);
};
