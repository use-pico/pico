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
import { Building_Base_Production_Requirement_Form } from "~/app/derivean/root/building/Building_Base_Production_Requirement_Form";

export namespace Building_Base_Production_Requirement_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		resourceId: string;
		amount: number;
		passive: boolean;
	}
}

const column = withColumn<Building_Base_Production_Requirement_Table.Data>();

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

export namespace Building_Base_Production_Requirement_Table {
	export interface Props extends Table.PropsEx<Data> {
		buildingBaseProductionId: string;
	}
}

export const Building_Base_Production_Requirement_Table: FC<
	Building_Base_Production_Requirement_Table.Props
> = ({ buildingBaseProductionId, table, ...props }) => {
	const invalidator = useInvalidator([
		["Building_Base_Production_Requirement"],
		["Building_Base_Production"],
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
								label={<Tx label={"Create production requirement (menu)"} />}
								textTitle={
									<Tx label={"Create production requirement (modal)"} />
								}
								icon={ResourceIcon}
							>
								{({ close }) => {
									return (
										<Building_Base_Production_Requirement_Form
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															return tx
																.insertInto(
																	"Building_Base_Production_Requirement",
																)
																.values({
																	id: genId(),
																	...values,
																	buildingBaseProductionId,
																})
																.returningAll()
																.executeTakeFirstOrThrow();
														}),
														withToastPromiseTx("Create requirement item"),
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
								textTitle={<Tx label={"Edit production requirement (modal)"} />}
								icon={ResourceIcon}
							>
								{({ close }) => {
									return (
										<Building_Base_Production_Requirement_Form
											defaultValues={data}
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															return tx
																.updateTable(
																	"Building_Base_Production_Requirement",
																)
																.set(values)
																.where("id", "=", data.id)
																.returningAll()
																.executeTakeFirstOrThrow();
														}),
														withToastPromiseTx("Update production requirement"),
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
								textTitle={
									<Tx label={"Delete production requirement (modal)"} />
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
												.deleteFrom("Building_Base_Production_Requirement")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={
										<Tx label={"Production requirement delete (content)"} />
									}
									textToast={"Production requirement item delete"}
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
