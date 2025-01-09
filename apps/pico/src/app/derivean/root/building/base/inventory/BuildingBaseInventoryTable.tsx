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
import { InventoryForm } from "~/app/derivean/root/inventory/InventoryForm";

interface Data extends IdentitySchema.Type {
	name: string;
	amount: number;
	limit: number;
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
];

export namespace BuildingBaseInventoryTable {
	export interface Props extends Table.PropsEx<Data> {
		buildingBaseId: string;
	}
}

export const BuildingBaseInventoryTable: FC<
	BuildingBaseInventoryTable.Props
> = ({ buildingBaseId, table, ...props }) => {
	const invalidator = useInvalidator([["Building_Base"], ["Inventory"]]);

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
								<InventoryForm
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

													await tx
														.insertInto("Building_Base_Inventory")
														.values({
															id: genId(),
															buildingBaseId,
															inventoryId: entity.id,
															level: 1,
														})
														.execute();

													return entity;
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
								<InventoryForm
									defaultValues={data}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.updateTable("Inventory")
														.set(values)
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
											return tx
												.deleteFrom("Inventory")
												.where("id", "=", data.id)
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
