import { useMutation } from "@tanstack/react-query";
import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    Table,
    toast,
    TrashIcon,
    Tx,
    useInvalidator,
    useTable,
    withColumn,
    withToastPromiseTx,
} from "@use-pico/client";
import { genId, toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { Inventory_Form } from "~/app/derivean/root/inventory/Inventory_Form";

export namespace Building_Base_Inventory_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		amount: number;
		limit: number;
		inventoryId: string;
	}
}

const column = withColumn<Building_Base_Inventory_Table.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 14,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
	column({
		name: "limit",
		header() {
			return <Tx label={"Inventory limit (label)"} />;
		},
		render({ value }) {
			return value === 0 ?
					<Tx label={"Unlimited (label)"} />
				:	toHumanNumber({ number: value });
		},
		size: 10,
	}),
];

export namespace Building_Base_Inventory_Table {
	export interface Props
		extends Table.PropsEx<Building_Base_Inventory_Table.Data> {
		buildingBaseId: string;
	}
}

export const Building_Base_Inventory_Table: FC<
	Building_Base_Inventory_Table.Props
> = ({ buildingBaseId, table, ...props }) => {
	const invalidator = useInvalidator([
		["Building_Base"],
		["Building_Base_Inventory"],
		["Inventory"],
	]);

	return (
		<Table
			table={useTable({
				...table,
				columns,
			})}
			action={{
				table() {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Create building base inventory (menu)"} />}
								textTitle={
									<Tx label={"Create building base inventory (modal)"} />
								}
								icon={InventoryIcon}
							>
								<Inventory_Form
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													const entity = await tx
														.insertInto("Inventory")
														.values({
															id: genId(),
															...values,
														})
														.returningAll()
														.executeTakeFirstOrThrow();

													return tx
														.insertInto("Building_Base_Inventory")
														.values({
															id: genId(),
															buildingBaseId,
															inventoryId: entity.id,
														})
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Create building base inventory"),
											);
										},
										async onSuccess() {
											await invalidator();
										},
									})}
								/>
							</ActionModal>
						</ActionMenu>
					);
				},
				row({ data }) {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Edit (menu)"} />}
								textTitle={<Tx label={"Edit building base (modal)"} />}
								icon={BuildingBaseIcon}
							>
								<Inventory_Form
									defaultValues={data}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.updateTable("Inventory")
														.set(values)
														.where("id", "=", data.inventoryId)
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Update building base inventory"),
											);
										},
										async onSuccess() {
											await invalidator();
										},
									})}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete (menu)"} />}
								textTitle={
									<Tx label={"Delete building base inventory (modal)"} />
								}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									callback={async () => {
										return kysely.transaction().execute(async (tx) => {
											/**
											 * Deleting from inventory, because it will also take down
											 * the building base inventory.
											 *
											 * Assuming that building inventory is used only for the building.
											 */
											return tx
												.deleteFrom("Inventory")
												.where("id", "=", data.inventoryId)
												.execute();
										});
									}}
									textContent={
										<Tx label={"Building base inventory delete (content)"} />
									}
									textToast={"Building base inventory delete"}
									invalidator={invalidator}
								/>
							</ActionModal>
						</ActionMenu>
					);
				},
			}}
			{...props}
		/>
	);
};
