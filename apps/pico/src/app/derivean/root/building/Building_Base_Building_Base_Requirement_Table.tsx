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
import { Building_Base_Building_Base_Requirement_Form } from "~/app/derivean/root/building/Building_Base_Building_Base_Requirement_Form";

export namespace Building_Base_Building_Base_Requirement_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		buildingBaseId: string;
		requirementId: string;
		amount: number;
	}
}

const column = withColumn<Building_Base_Building_Base_Requirement_Table.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Required building (label)"} />;
		},
		render({ value }) {
			return value;
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
		size: 10,
	}),
];

export namespace Building_Base_Building_Base_Requirement_Table {
	export interface Props extends Table.PropsEx<Data> {
		buildingBaseId: string;
	}
}

export const Building_Base_Building_Base_Requirement_Table: FC<
	Building_Base_Building_Base_Requirement_Table.Props
> = ({ buildingBaseId, table, ...props }) => {
	const invalidator = useInvalidator([
		["Building_Base_Building_Base_Requirement"],
		["Building_Base"],
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
								label={<Tx label={"Create required building (menu)"} />}
								textTitle={<Tx label={"Create required building (modal)"} />}
								icon={BuildingBaseIcon}
							>
								{({ close }) => {
									return (
										<Building_Base_Building_Base_Requirement_Form
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															return tx
																.insertInto(
																	"Building_Base_Building_Base_Requirement",
																)
																.values({
																	id: genId(),
																	...values,
																	buildingBaseId,
																})
																.returningAll()
																.executeTakeFirstOrThrow();
														}),
														withToastPromiseTx("Create required building"),
													);
												},
												async onSuccess() {
													await invalidator();
													close();
												},
											})}
										/>
									);
								}}
							</ActionModal>
						</ActionMenu>
					);
				},
				row({ data }) {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Edit (menu)"} />}
								textTitle={<Tx label={"Edit required building (modal)"} />}
								icon={BuildingBaseIcon}
							>
								{({ close }) => {
									return (
										<Building_Base_Building_Base_Requirement_Form
											defaultValues={data}
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															return tx
																.updateTable(
																	"Building_Base_Building_Base_Requirement",
																)
																.set(values)
																.where("id", "=", data.id)
																.returningAll()
																.executeTakeFirstOrThrow();
														}),
														withToastPromiseTx("Update required building"),
													);
												},
												async onSuccess() {
													await invalidator();
													close();
												},
											})}
										/>
									);
								}}
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete (menu)"} />}
								textTitle={<Tx label={"Delete required building (modal)"} />}
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
												.deleteFrom("Building_Base_Building_Base_Requirement")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={
										<Tx label={"Delete required building (content)"} />
									}
									textToast={"Delete required building"}
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
