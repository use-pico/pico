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
import { id, toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/db";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { InventoryForm } from "~/app/derivean/root/inventory/InventoryForm";

interface Data extends IdentitySchema.Type {
	name: string;
	amount: number;
	limit: number;
	resourceId: string;
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
		filter: {
			path: "resourceId",
			onFilter({ data, filter }) {
				filter.shallow("resourceId", data.resourceId);
			},
		},
		size: 18,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 18,
	}),
	column({
		name: "limit",
		header() {
			return <Tx label={"Limit (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 18,
	}),
];

export namespace InventoryTable {
	export interface Props extends Table.PropsEx<Data> {
		userId?: string;
	}
}

export const InventoryTable: FC<InventoryTable.Props> = ({
	userId,
	table,
	...props
}) => {
	const invalidator = useInvalidator([["Inventory"], ["User_Inventory"]]);

	return (
		<Table
			table={useTable({
				...table,
				columns,
			})}
			action={{
				table:
					userId ?
						() => {
							return (
								<ActionMenu>
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
															const entity = await tx
																.insertInto("Inventory")
																.values({
																	id: id(),
																	...values,
																})
																.returningAll()
																.executeTakeFirstOrThrow();

															await tx
																.insertInto("User_Inventory")
																.values({
																	id: id(),
																	userId,
																	inventoryId: entity.id,
																})
																.execute();

															return entity;
														}),
														withToastPromiseTx("Create inventory item"),
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
						}
					:	undefined,
				row({ data }) {
					return (
						<ActionMenu>
							{userId ?
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
															.where("id", "=", data.id)
															.returningAll()
															.executeTakeFirstOrThrow();
													}),
													withToastPromiseTx("Update inventory item"),
												);
											},
										})}
										onSuccess={async ({ modalContext }) => {
											await invalidator();
											modalContext?.close();
										}}
									/>
								</ActionModal>
							:	null}

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
												.where("id", "=", data.id)
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
