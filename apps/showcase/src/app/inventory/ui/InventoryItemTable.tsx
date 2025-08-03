import { TableControl, Tx, withColumn } from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import type { InventoryItemQuerySchema } from "~/app/inventory/db/InventoryItemQuerySchema";
import type { InventoryItemSchema } from "~/app/inventory/db/InventoryItemSchema";
import { withInventoryItemListQuery } from "~/app/inventory/query/withInventoryItemListQuery";

const { create, filter } = withColumn<
	InventoryItemQuerySchema.Type,
	InventoryItemSchema.Type
>();

const columns = [
	create({
		name: "id",
		header: () => <Tx label={"ID"} />,
		render: ({ value }) => value,
		size: 12,
	}),
	create({
		name: "name",
		header: () => <Tx label={"Name"} />,
		render: ({ value }) => value,
		size: "auto",
	}),
	create({
		name: "description",
		header: () => <Tx label={"Description"} />,
		render: ({ value }) => value ?? "-",
		size: "auto",
	}),
	create({
		name: "amount",
		header: () => <Tx label={"Amount"} />,
		render: ({ value }) =>
			toHumanNumber({
				number: value,
			}),
		filter: filter.range({
			gte: "amountGte",
			lte: "amountLte",
			path: "amount",
		}),
		size: 12,
	}),
];

export namespace InventoryItemTable {
	export interface Props
		extends TableControl.PropsEx<
			InventoryItemQuerySchema.Type,
			InventoryItemSchema.Type
		> {
		//
	}
}

export const InventoryItemTable: FC<InventoryItemTable.Props> = (props) => {
	return (
		<TableControl
			withQuery={withInventoryItemListQuery()}
			context={{}}
			columns={columns}
			{...props}
		/>
	);
};
