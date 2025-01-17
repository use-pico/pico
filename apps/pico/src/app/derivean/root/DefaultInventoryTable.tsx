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
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { DefaultInventoryForm } from "~/app/derivean/root/DefaultInventoryForm";

export namespace DefaultInventoryTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		amount: number;
		limit: number;
		resourceId: string;
	}
}

const column = withColumn<DefaultInventoryTable.Data>();

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

export namespace DefaultInventoryTable {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const DefaultInventoryTable: FC<DefaultInventoryTable.Props> = ({
	table,
	...props
}) => {
	const invalidator = useInvalidator([["Default_Inventory"]]);

	const fillMissingResourcesMutation = useMutation({
		async mutationFn() {
			return kysely.transaction().execute(async (tx) => {
				const resources = await tx
					.selectFrom("Resource as r")
					.select(["r.id"])
					.where(
						"r.id",
						"not in",
						tx.selectFrom("Default_Inventory").select("resourceId"),
					)
					.execute();

				return tx
					.insertInto("Default_Inventory")
					.values(
						resources.map(({ id }) => {
							return {
								id: genId(),
								amount: 0,
								limit: 0,
								resourceId: id,
							};
						}),
					)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
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
							<ActionModal
								label={<Tx label={"Create inventory item (menu)"} />}
								textTitle={<Tx label={"Create inventory item (modal)"} />}
								icon={InventoryIcon}
							>
								<DefaultInventoryForm
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.insertInto("Default_Inventory")
														.values({
															id: genId(),
															...values,
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
							<ActionClick
								icon={ResourceIcon}
								onClick={() => {
									fillMissingResourcesMutation.mutate();
								}}
							>
								<Tx label={"Fill missing resources (label)"} />
							</ActionClick>
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
								<DefaultInventoryForm
									defaultValues={data}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.updateTable("Default_Inventory")
														.set(values)
														.where("id", "=", data.id)
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
												.deleteFrom("Default_Inventory")
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
