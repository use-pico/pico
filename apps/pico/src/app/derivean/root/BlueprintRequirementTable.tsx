import { useMutation } from "@tanstack/react-query";
import {
    ActionMenu,
    ActionModal,
    BoolInline,
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
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { BlueprintRequirementForm } from "~/app/derivean/root/BlueprintRequirementForm";

export namespace BlueprintRequirementTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		resourceId: string;
		amount: number;
		passive: boolean;
	}
}

const column = withColumn<BlueprintRequirementTable.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Requirement name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		filter: {
			path: "resourceId",
			onFilter({ data, filter }) {
				filter.shallow("resourceID", data.resourceId);
			},
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
		name: "passive",
		header() {
			return <Tx label={"Passive requirement (label)"} />;
		},
		render({ value }) {
			return <BoolInline value={value} />;
		},
		size: 10,
	}),
];

export namespace BlueprintRequirementTable {
	export interface Props extends Table.PropsEx<Data> {
		blueprintId: string;
	}
}

export const BlueprintRequirementTable: FC<BlueprintRequirementTable.Props> = ({
	blueprintId,
	table,
	...props
}) => {
	const invalidator = useInvalidator([
		["Blueprint"],
		["Blueprint_Requirement"],
		["Blueprint_Resource_Requirement"],
		["Resource"],
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
								label={<Tx label={"Create requirement item (menu)"} />}
								textTitle={<Tx label={"Create requirement item (modal)"} />}
								icon={ResourceIcon}
							>
								<BlueprintRequirementForm
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.insertInto("Blueprint_Requirement")
														.values({
															id: genId(),
															...values,
															blueprintId,
														})
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Create requirement item"),
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
								textTitle={<Tx label={"Edit requirement item (modal)"} />}
								icon={ResourceIcon}
							>
								<BlueprintRequirementForm
									defaultValues={data}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.updateTable("Blueprint_Requirement")
														.set(values)
														.where("id", "=", data.id)
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Update requirement item"),
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
								textTitle={<Tx label={"Delete requirement item (modal)"} />}
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
												.deleteFrom("Blueprint_Requirement")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={
										<Tx label={"Delete requirement item (content)"} />
									}
									textToast={"Delete requirement item"}
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
