import { useMutation } from "@tanstack/react-query";
import {
    ActionClick,
    ActionMenu,
    ActionModal,
    DeleteControl,
    Progress,
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
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { InventoryTypeInline } from "~/app/derivean/inventory/InventoryTypeInline";
import { InventoryForm } from "~/app/derivean/root/InventoryForm";

export namespace BlueprintInventoryTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		amount: number;
		limit: number;
		resourceId: string;
		inventoryId: string;
		type: "storage" | "construction" | "input" | "output";
	}
}

const column = withColumn<BlueprintInventoryTable.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		filter: {
			path: "resourceId",
			onFilter({ data, filter }) {
				filter.shallow("resourceId", data.resourceId);
			},
		},
		size: 18,
	}),
	column({
		name: "type",
		header() {
			return <Tx label={"Inventory type (label)"} />;
		},
		render({ value }) {
			return <InventoryTypeInline label={value} />;
		},
		filter: {
			path: "type",
			onFilter({ data, filter }) {
				filter.shallow("type", data.type);
			},
		},
		size: 12,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 12,
	}),
	column({
		name: "limit",
		header() {
			return <Tx label={"Inventory limit (label)"} />;
		},
		render({ value, data }) {
			return (
				<div className={"flex flex-row items-center gap-2 w-full"}>
					<div>{toHumanNumber({ number: value })}</div>
					<Progress value={(100 * data.amount) / data.limit} />
				</div>
			);
		},
		size: 14,
	}),
];

export namespace BlueprintInventoryTable {
	export interface Props extends Table.PropsEx<Data> {
		blueprintId: string;
	}
}

export const BlueprintInventoryTable: FC<BlueprintInventoryTable.Props> = ({
	blueprintId,
	table,
	...props
}) => {
	const invalidator = useInvalidator([["Blueprint_Inventory"]]);
	const fillInventoryMutation = useMutation({
		async mutationFn() {
			return kysely.transaction().execute(async (tx) => {
				await tx
					.deleteFrom("Blueprint_Inventory")
					.where("blueprintId", "=", blueprintId)
					.execute();

				const requirements = await tx
					.selectFrom("Blueprint_Requirement")
					.select(["resourceId", "amount"])
					.where("blueprintId", "=", blueprintId)
					.execute();

				for await (const { resourceId, amount } of requirements) {
					await tx
						.insertInto("Blueprint_Inventory")
						.values({
							id: genId(),
							blueprintId,
							inventoryId: (
								await tx
									.insertInto("Inventory")
									.values({
										id: genId(),
										resourceId,
										amount: 0,
										limit: amount,
										type: "construction",
									})
									.returning("id")
									.executeTakeFirstOrThrow()
							).id,
						})
						.execute();
				}

				const production = await tx
					.selectFrom("Blueprint_Production")
					.select(["resourceId", (eb) => eb.fn.max("amount").as("amount")])
					.where("blueprintId", "=", blueprintId)
					.orderBy("amount", "desc")
					.groupBy("resourceId")
					.execute();

				for await (const { resourceId, amount } of production) {
					await tx
						.insertInto("Blueprint_Inventory")
						.values({
							id: genId(),
							blueprintId,
							inventoryId: (
								await tx
									.insertInto("Inventory")
									.values({
										id: genId(),
										resourceId,
										amount: 0,
										limit: amount * 5,
										type: "output",
									})
									.returning("id")
									.executeTakeFirstOrThrow()
							).id,
						})
						.execute();
				}

				const inputs = await tx
					.selectFrom("Blueprint_Production_Resource as bpr")
					.innerJoin(
						"Blueprint_Production as bp",
						"bp.id",
						"bpr.blueprintProductionId",
					)
					.select([
						"bpr.resourceId",
						(eb) => eb.fn.max("bpr.amount").as("amount"),
					])
					.where("bp.blueprintId", "=", blueprintId)
					.orderBy("bpr.amount", "desc")
					.groupBy("bpr.resourceId")
					.execute();

				for await (const { resourceId, amount } of inputs) {
					await tx
						.insertInto("Blueprint_Inventory")
						.values({
							id: genId(),
							blueprintId,
							inventoryId: (
								await tx
									.insertInto("Inventory")
									.values({
										id: genId(),
										resourceId,
										amount: 0,
										limit: amount * 5,
										type: "input",
									})
									.returning("id")
									.executeTakeFirstOrThrow()
							).id,
						})
						.execute();
				}

				const productionRequirements = await tx
					.selectFrom("Blueprint_Production_Requirement as bpr")
					.innerJoin(
						"Blueprint_Production as bp",
						"bp.id",
						"bpr.blueprintProductionId",
					)
					.select([
						"bpr.resourceId",
						(eb) => eb.fn.max("bpr.amount").as("amount"),
					])
					.where("bp.blueprintId", "=", blueprintId)
					.orderBy("bpr.amount", "desc")
					.groupBy("bpr.resourceId")
					.execute();

				for await (const { resourceId, amount } of productionRequirements) {
					await tx
						.insertInto("Blueprint_Inventory")
						.values({
							id: genId(),
							blueprintId,
							inventoryId: (
								await tx
									.insertInto("Inventory")
									.values({
										id: genId(),
										resourceId,
										amount: 0,
										limit: amount * 5,
										type: "input",
									})
									.returning("id")
									.executeTakeFirstOrThrow()
							).id,
						})
						.execute();
				}
			});
		},
		async onSuccess() {
			await invalidator();
		},
		onError(error) {
			console.error(error);
		},
	});

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
							<ActionClick
								icon={InventoryIcon}
								onClick={() => {
									fillInventoryMutation.mutate();
								}}
							>
								<Tx label={"Fill inventory (label)"} />
							</ActionClick>

							<ActionModal
								label={<Tx label={"Create inventory item (menu)"} />}
								textTitle={<Tx label={"Create inventory item (modal)"} />}
								icon={InventoryIcon}
							>
								<InventoryForm
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.insertInto("Blueprint_Inventory")
														.values({
															id: genId(),
															blueprintId,
															inventoryId: (
																await tx
																	.insertInto("Inventory")
																	.values({
																		id: genId(),
																		...values,
																	})
																	.returningAll()
																	.executeTakeFirstOrThrow()
															).id,
														})
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Create inventory item"),
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
								textTitle={<Tx label={"Edit inventory item (modal)"} />}
								icon={InventoryIcon}
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
														.where("id", "=", data.inventoryId)
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Update inventory item"),
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
								textTitle={<Tx label={"Delete inventory item (modal)"} />}
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
												.where("id", "=", data.inventoryId)
												.execute();
										});
									}}
									textContent={<Tx label={"Inventory item delete (content)"} />}
									textToast={"Inventory item delete"}
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
