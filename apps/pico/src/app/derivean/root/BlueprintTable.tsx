import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    Icon,
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
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";
import { BlueprintDependenciesInline } from "~/app/derivean/root/BlueprintDependenciesInline";
import { BlueprintForm } from "~/app/derivean/root/BlueprintForm";
import { Dependencies } from "~/app/derivean/root/Dependencies";
import { RequirementsInline } from "~/app/derivean/root/RequirementsInline";
import type { BlueprintDependencySchema } from "~/app/derivean/schema/BlueprintDependencySchema";
import type { BlueprintRequirementSchema } from "~/app/derivean/schema/BlueprintRequirementSchema";
import { withBlueprintSort } from "~/app/derivean/service/withBlueprintSort";
import type { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";
import type { withBlueprintUpgradeGraph } from "~/app/derivean/utils/withBlueprintUpgradeGraph";

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
		upgrades?: string;
	}

	export interface Context {
		dependencies?: withBlueprintGraph.Result;
		upgrades?: withBlueprintUpgradeGraph.Result;
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
		size: 14,
	}),
	column({
		name: "dependencies",
		header() {
			return <Tx label={"Blueprint dependencies (label)"} />;
		},
		render({ data, value, context: { dependencies } }) {
			return value.length > 0 ?
					<div className={"flex flex-col flex-wrap gap-2 w-full"}>
						<BlueprintDependenciesInline
							textTitle={<Tx label={"Blueprint dependencies (title)"} />}
							dependencies={value}
						/>
						<div className={"border-b border-slate-200"} />
						{dependencies ?
							<Dependencies
								graph={dependencies}
								blueprintId={data.id}
							/>
						:	null}
					</div>
				:	<Tx label={"No dependencies (label)"} />;
		},
		size: 32,
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
				/>
			);
		},
		size: 32,
	}),
	column({
		name: "upgrades",
		header() {
			return <Tx label={"Blueprint upgrade path (label)"} />;
		},
		render({ data, context: { upgrades } }) {
			return upgrades ?
					<Dependencies
						graph={upgrades}
						blueprintId={data.id}
						reverse
					/>
				:	null;
		},
		size: 32,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Construction cycles (label)"} />;
		},
		render({ value }) {
			return (
				<div className={"flex flex-row items-center gap-2"}>
					<Icon icon={CycleIcon} />
					{toHumanNumber({ number: value })}
				</div>
			);
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
];

export namespace BlueprintTable {
	export interface Props extends Table.PropsEx<Data, BlueprintTable.Context> {
		dependencies?: withBlueprintGraph.Result;
		upgrades?: withBlueprintUpgradeGraph.Result;
	}
}

export const BlueprintTable: FC<BlueprintTable.Props> = ({
	dependencies,
	upgrades,
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
					dependencies,
					upgrades,
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
															const entity = tx
																.insertInto("Blueprint")
																.values({
																	id: genId(),
																	...values,
																})
																.returningAll()
																.executeTakeFirstOrThrow();

															await withBlueprintSort({
																tx,
															});

															return entity;
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
															const entity = tx
																.updateTable("Blueprint")
																.set(values)
																.where("id", "=", data.id)
																.returningAll()
																.executeTakeFirstOrThrow();

															await withBlueprintSort({
																tx,
															});

															return entity;
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
