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
import { withInventoryItemCountQuery } from "~/app/inventory/query/withInventoryItemCountQuery";
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
		size: 18,
	}),
	create({
		name: "name",
		header: () => <Tx label={"Name"} />,
		render: ({ value }) => value,
		sort: {
			value: "name",
		},
		size: 24,
	}),
	create({
		name: "description",
		header: () => <Tx label={"Description"} />,
		render: ({ value }) => value ?? "-",
		size: 32,
	}),
	create({
		name: "kind",
		header: () => <Tx label={"Kind"} />,
		render: ({ value }) => value,
		filter: filter.equal({
			value: "kind",
			from: "kind",
		}),
		sort: {
			value: "kind",
		},
		size: 14,
	}),
	create({
		name: "type",
		header: () => <Tx label={"Type"} />,
		render: ({ value }) => value,
		filter: filter.equal({
			value: "type",
			from: "type",
		}),
		sort: {
			value: "type",
		},
		size: 14,
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
		size: 14,
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
			withCountQuery={withInventoryItemCountQuery()}
			context={{}}
			columns={columns}
			// rowCls={({ data }) => {
			// 	return data.amount > 650
			// 		? [
			// 				"bg-red-300",
			// 				"odd:bg-red-400",
			// 			]
			// 		: "";
			// }}
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
