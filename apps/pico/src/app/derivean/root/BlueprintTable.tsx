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
import { kysely } from "~/app/derivean/db/kysely";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { BlueprintDependenciesInline } from "~/app/derivean/root/BlueprintDependenciesInline";
import { BlueprintForm } from "~/app/derivean/root/BlueprintForm";
import { Dependencies } from "~/app/derivean/root/Dependencies";
import { RequirementsInline } from "~/app/derivean/root/RequirementsInline";
import type { BlueprintDependencySchema } from "~/app/derivean/schema/BlueprintDependencySchema";
import type { BlueprintRequirementSchema } from "~/app/derivean/schema/BlueprintRequirementSchema";
import type { withBlueprintGraph } from "~/app/derivean/utils/withBuildingGraph";

export namespace BlueprintTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		cycles: number;
		sort: number;
		productionLimit: number;
		requirements: (BlueprintRequirementSchema["~entity"] & {
			name: string;
		})[];
		dependencies: (BlueprintDependencySchema["~entity"] & {
			name: string;
		})[];
		graph?: string;
	}

	export interface Context {
		graph?: withBlueprintGraph.Result;
	}
}

const column = withColumn<BlueprintTable.Data, BlueprintTable.Context>();

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
					icon={BlueprintIcon}
					to={"/$locale/apps/derivean/root/blueprint/$id/view"}
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
		name: "sort",
		header() {
			return <Tx label={"Blueprint sort (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 8,
	}),
	column({
		name: "productionLimit",
		header() {
			return <Tx label={"Production limit (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 8,
	}),
	column({
		name: "requirements",
		header() {
			return <Tx label={"Required resources (label)"} />;
		},
		render({ value }) {
			return (
				<RequirementsInline
					textTitle={<Tx label={"Blueprint requirements (title)"} />}
					textEmpty={<Tx label={"No requirements (label)"} />}
					requirements={value}
					limit={5}
				/>
			);
		},
		size: 54,
	}),
	column({
		name: "dependencies",
		header() {
			return <Tx label={"Blueprint dependencies (label)"} />;
		},
		render({ value }) {
			return (
				<BlueprintDependenciesInline
					textTitle={<Tx label={"Blueprint dependencies (title)"} />}
					textEmpty={<Tx label={"No dependencies (label)"} />}
					dependencies={value}
				/>
			);
		},
		size: 64,
	}),
	column({
		name: "graph",
		header() {
			return <Tx label={"Blueprint graph (label)"} />;
		},
		render({ data, context: { graph } }) {
			return graph ?
					<Dependencies
						graph={graph}
						blueprintId={data.id}
					/>
				:	"-";
		},
		size: 64,
	}),
];

export namespace BlueprintTable {
	export interface Props extends Table.PropsEx<Data, BlueprintTable.Context> {
		graph?: withBlueprintGraph.Result;
	}
}

export const BlueprintTable: FC<BlueprintTable.Props> = ({
	graph,
	table,
	...props
}) => {
	const invalidator = useInvalidator([["Blueprint"], ["Inventory"]]);

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
								label={<Tx label={"Create blueprint (menu)"} />}
								textTitle={<Tx label={"Create blueprint (modal)"} />}
								icon={BlueprintIcon}
							>
								{({ close }) => {
									return (
										<BlueprintForm
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															return tx
																.insertInto("Blueprint")
																.values({
																	id: genId(),
																	...values,
																})
																.returningAll()
																.executeTakeFirstOrThrow();
														}),
														withToastPromiseTx("Create blueprint"),
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
								textTitle={<Tx label={"Edit blueprint (modal)"} />}
								icon={BlueprintIcon}
							>
								{({ close }) => {
									return (
										<BlueprintForm
											defaultValues={data}
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															return tx
																.updateTable("Blueprint")
																.set(values)
																.where("id", "=", data.id)
																.returningAll()
																.executeTakeFirstOrThrow();
														}),
														withToastPromiseTx("Update blueprint"),
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
								textTitle={<Tx label={"Delete blueprint (modal)"} />}
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
												.deleteFrom("Blueprint")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={<Tx label={"Delete blueprint (content)"} />}
									textToast={"Delete blueprint"}
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
