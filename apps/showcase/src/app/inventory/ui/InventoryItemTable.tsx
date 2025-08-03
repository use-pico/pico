import {
	ActionClick,
	ActionMenu,
	EditIcon,
	Table,
	TrashIcon,
	Tx,
	withColumn,
} from "@use-pico/client";
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
		sort: {
			value: "name",
		},
		size: "auto",
	}),
	create({
		name: "description",
		header: () => <Tx label={"Description"} />,
		render: ({ value }) => value ?? "-",
		size: "auto",
	}),
	create({
		name: "kind",
		header: () => <Tx label={"Kind"} />,
		render: ({ value }) => value,
		filter: filter.equal({
			path: "kind",
		}),
		sort: {
			value: "kind",
		},
		size: 12,
	}),
	create({
		name: "type",
		header: () => <Tx label={"Type"} />,
		render: ({ value }) => value,
		filter: filter.equal({
			path: "type",
		}),
		sort: {
			value: "type",
		},
		size: 12,
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
		sort: {
			value: "amount",
		},
		size: 12,
	}),
];

export namespace InventoryItemTable {
	export interface Props
		extends Table.PropsEx<
			InventoryItemQuerySchema.Type,
			InventoryItemSchema.Type
		> {
		//
	}
}

export const InventoryItemTable: FC<InventoryItemTable.Props> = (props) => {
	return (
		<Table
			withQuery={withInventoryItemListQuery()}
			context={{}}
			columns={columns}
			// actionWidth={({ controlsHidden }) => {
			// 	return controlsHidden.includes("actions") ? "auto" : "8rem";
			// }}
			// controlsHidden={[
			// 	"toolbar",
			// 	"actions",
			// ]}
			toolbar={() => {
				return (
					<ActionMenu withOverlay>
						<ActionClick icon={EditIcon}>
							<Tx label={"Add"} />
						</ActionClick>
					</ActionMenu>
				);
			}}
			actionTable={() => {
				return (
					<ActionMenu withOverlay>
						<ActionClick icon={EditIcon}>
							<Tx label={"Add"} />
						</ActionClick>

						<ActionClick
							icon={TrashIcon}
							variant={{
								variant: "danger",
							}}
						>
							<Tx label={"Remove all"} />
						</ActionClick>
					</ActionMenu>
				);
			}}
			actionRow={() => {
				return (
					<ActionMenu withOverlay>
						<ActionClick icon={EditIcon}>
							<Tx label={"Edit"} />
						</ActionClick>
					</ActionMenu>
				);
			}}
			{...props}
		/>
	);
};
