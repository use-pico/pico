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
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourceProductionForm } from "~/app/derivean/root/resource/production/ResourceProductionForm";

interface Data extends IdentitySchema.Type {
	name: string;
	amount: number;
	limit: number;
	cycles: number;
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
			return <Tx label={"Production limit (label)"} />;
		},
		render({ value }) {
			return value === 0 ?
					<Tx label={"Unlimited (label)"} />
				:	toHumanNumber({ number: value });
		},
		size: 10,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Production cycles (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
];

export namespace BuildingBaseProductionTable {
	export interface Props extends Table.PropsEx<Data> {
		buildingBaseId: string;
	}
}

export const BuildingBaseProductionTable: FC<
	BuildingBaseProductionTable.Props
> = ({ buildingBaseId, table, ...props }) => {
	const invalidator = useInvalidator([
		["Building_Base_Production"],
		["Resource_Production"],
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
								label={<Tx label={"Create building base production (menu)"} />}
								textTitle={
									<Tx label={"Create building base production (modal)"} />
								}
								icon={ProductionIcon}
							>
								<ResourceProductionForm
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													const entity = await tx
														.insertInto("Resource_Production")
														.values({
															id: id(),
															...values,
														})
														.returningAll()
														.executeTakeFirstOrThrow();

													await tx
														.insertInto("Building_Base_Production")
														.values({
															id: id(),
															buildingBaseId,
															resourceProductionId: entity.id,
														})
														.execute();

													return entity;
												}),
												withToastPromiseTx("Create building base production"),
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
								textTitle={
									<Tx label={"Edit building base production (modal)"} />
								}
								icon={ProductionIcon}
							>
								<ResourceProductionForm
									defaultValues={data}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.updateTable("Resource_Production")
														.set(values)
														.where("id", "=", data.id)
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Update building base production"),
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
								textTitle={<Tx label={"Delete building production (modal)"} />}
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
												.deleteFrom("Building_Base_Production")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={
										<Tx label={"Building base production delete (content)"} />
									}
									textToast={"Building base production delete"}
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
