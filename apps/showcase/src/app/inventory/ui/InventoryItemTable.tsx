import { TableControl, Tx, withColumn } from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import type { InventoryItemQuerySchema } from "~/app/inventory/db/InventoryItemQuerySchema";
import type { InventoryItemSchema } from "~/app/inventory/db/InventoryItemSchema";
import { withInventoryItemListQuery } from "~/app/inventory/query/withInventoryItemListQuery";

const column = withColumn<
	InventoryItemQuerySchema.Type,
	InventoryItemSchema.Type
>();

const columns = [
	column({
		name: "id",
		header: () => <Tx label={"ID"} />,
		render: ({ value }) => value,
		size: 12,
	}),
	column({
		name: "name",
		header: () => <Tx label={"Name"} />,
		render: ({ value }) => value,
		size: "auto",
	}),
	column({
		name: "description",
		header: () => <Tx label={"Description"} />,
		render: ({ value }) => value ?? "-",
		size: "auto",
	}),
	column({
		name: "amount",
		header: () => <Tx label={"Amount"} />,
		render: ({ value }) =>
			toHumanNumber({
				number: value,
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
