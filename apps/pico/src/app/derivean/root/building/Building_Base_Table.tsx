import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    LinkTo,
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
import { Building_Requirement_Inline } from "~/app/derivean/building/Building_Requirement_Inline";
import { kysely } from "~/app/derivean/db/kysely";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { RequirementsInline } from "~/app/derivean/resource/ResourceInline";
import { Building_Base_Form } from "~/app/derivean/root/building/Building_Base_Form";
import { Dependencies } from "~/app/derivean/root/building/Dependencies";
import type { Building_Base_Building_Base_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Building_Base_Requirement_Schema";
import type { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";
import type { withBuildingGraph } from "~/app/derivean/utils/withBuildingGraph";

export namespace Building_Base_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		cycles: number;
		requiredResources: (Building_Base_Resource_Requirement_Schema["~entity"] & {
			name: string;
		})[];
		requiredBuildings: (Building_Base_Building_Base_Requirement_Schema["~entity"] & {
			name: string;
		})[];
		graph?: string;
	}

	export interface Context {
		graph?: withBuildingGraph.Result;
	}
}

const column = withColumn<
	Building_Base_Table.Data,
	Building_Base_Table.Context
>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Building name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/building/base/$id/view"}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 10,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Construction cycles (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 8,
	}),
	column({
		name: "requiredResources",
		header() {
			return <Tx label={"Required resources (label)"} />;
		},
		render({ value }) {
			return (
				<RequirementsInline
					textTitle={<Tx label={"Building requirements (title)"} />}
					textEmpty={<Tx label={"No requirements (label)"} />}
					requirements={value}
					limit={5}
				/>
			);
		},
		size: 42,
	}),
	column({
		name: "requiredBuildings",
		header() {
			return <Tx label={"Required buildings (label)"} />;
		},
		render({ data, value, context: { graph } }) {
			return (
				<div className={"flex flex-col gap-2 items-start justify-center"}>
					<Building_Requirement_Inline
						textTitle={<Tx label={"Building requirements (title)"} />}
						textEmpty={<Tx label={"No requirements (label)"} />}
						requirements={value}
						limit={5}
					/>
					{graph ?
						<Dependencies
							graph={graph}
							mode={"dependants"}
							buildingBaseId={data.id}
						/>
					:	null}
				</div>
			);
		},
		size: 64,
	}),
	column({
		name: "graph",
		header() {
			return <Tx label={"Building dependencies (label)"} />;
		},
		render({ data, context: { graph } }) {
			return graph ?
					<Dependencies
						graph={graph}
						buildingBaseId={data.id}
					/>
				:	"-";
		},
		size: 64,
	}),
];

export namespace Building_Base_Table {
	export interface Props
		extends Table.PropsEx<Data, Building_Base_Table.Context> {
		graph?: withBuildingGraph.Result;
	}
}

export const Building_Base_Table: FC<Building_Base_Table.Props> = ({
	graph,
	table,
	...props
}) => {
	const invalidator = useInvalidator([["Building_Base"], ["Inventory"]]);

	return (
		<Table
			table={useTable({
				...table,
				columns,
				context: {
					graph,
				},
			})}
			action={{
				table() {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Create building base (menu)"} />}
								textTitle={<Tx label={"Create building base (modal)"} />}
								icon={BuildingBaseIcon}
							>
								{({ close }) => {
									return (
										<Building_Base_Form
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															return tx
																.insertInto("Building_Base")
																.values({
																	id: genId(),
																	...values,
																})
																.returningAll()
																.executeTakeFirstOrThrow();
														}),
														withToastPromiseTx("Create building base"),
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
								textTitle={<Tx label={"Edit building base (modal)"} />}
								icon={BuildingBaseIcon}
							>
								{({ close }) => {
									return (
										<Building_Base_Form
											defaultValues={data}
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															return tx
																.updateTable("Building_Base")
																.set(values)
																.where("id", "=", data.id)
																.returningAll()
																.executeTakeFirstOrThrow();
														}),
														withToastPromiseTx("Update building base"),
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
								textTitle={<Tx label={"Delete building (modal)"} />}
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
												.deleteFrom("Building_Base")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={<Tx label={"Building base delete (content)"} />}
									textToast={"Building base delete"}
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
