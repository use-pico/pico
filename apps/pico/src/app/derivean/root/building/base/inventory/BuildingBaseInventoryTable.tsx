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
import { BuildingBaseInventoryForm } from "~/app/derivean/root/building/base/inventory/BuildingBaseInventoryForm";

interface Data extends IdentitySchema.Type {
	name: string;
	amount: number;
	limit: number;
	level: number;
	inventoryId: string;
}

const column = withColumn<Data>();

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
	column({
		name: "level",
		header() {
			return <Tx label={"Inventory level (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
];

export namespace BuildingBaseInventoryTable {
	export interface Props extends Table.PropsEx<Data> {
		buildingBaseId: string;
	}
}

export const BuildingBaseInventoryTable: FC<
	BuildingBaseInventoryTable.Props
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
								<BuildingBaseInventoryForm
									mutation={useMutation({
										async mutationFn({ level, ...values }) {
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
															level,
														})
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Create building base inventory"),
											);
										},
									})}
									onSuccess={async ({ modalContext }) => {
										await invalidator();
										modalContext?.close();
									}}
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
								<BuildingBaseInventoryForm
									defaultValues={data}
									mutation={useMutation({
										async mutationFn({ level, ...values }) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													await tx
														.updateTable("Inventory")
														.set(values)
														.where("id", "=", data.inventoryId)
														.returningAll()
														.executeTakeFirstOrThrow();

													return tx
														.updateTable("Building_Base_Inventory")
														.set({ level })
														.where("id", "=", data.id)
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Update building base inventory"),
											);
										},
									})}
									onSuccess={async ({ modalContext }) => {
										await invalidator();
										modalContext?.close();
									}}
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
