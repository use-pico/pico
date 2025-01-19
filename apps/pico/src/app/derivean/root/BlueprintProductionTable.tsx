import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    LinkTo,
    More,
    Table,
    TrashIcon,
    Tx,
    useInvalidator,
    useTable,
    withColumn,
} from "@use-pico/client";
import {
    genId,
    toHumanNumber,
    tvc,
    type IdentitySchema,
} from "@use-pico/common";
import { type FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { BlueprintProductionForm } from "~/app/derivean/root/BlueprintProductionForm";
import { MoveProductionToForm } from "~/app/derivean/root/MoveProductionToForm";
import { RequirementsInline } from "~/app/derivean/root/RequirementsInline";
import type { BlueprintProductionRequirementSchema } from "~/app/derivean/schema/BlueprintProductionRequirementSchema";
import type { BlueprintProductionResourceSchema } from "~/app/derivean/schema/BlueprintProductionResourceSchema";

export namespace BlueprintProductionTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		resourceId: string;
		amount: number;
		limit: number;
		cycles: number;
		requirements: (BlueprintProductionRequirementSchema["~entity"] & {
			name: string;
		})[];
		resources: (BlueprintProductionResourceSchema["~entity"] & {
			name: string;
		})[];
	}
}

const column = withColumn<BlueprintProductionTable.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					icon={ProductionIcon}
					to={
						"/$locale/apps/derivean/root/blueprint/production/$id/requirements"
					}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
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
		size: 8,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Production cycles (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 8,
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
					textTitle={<Tx label={"Resource requirements (title)"} />}
					textEmpty={<Tx label={"No requirements (label)"} />}
					requirements={value}
				/>
			);
		},
		size: 32,
	}),
	column({
		name: "resources",
		header() {
			return <Tx label={"Required production resources (label)"} />;
		},
		render({ value }) {
			return (
				<More<BlueprintProductionTable.Data["resources"][number]>
					items={value}
					render={({ entity }) => {
						return (
							<div
								className={tvc([
									"flex",
									"flex-row",
									"gap-2",
									"items-center",
									"bg-sky-100",
									"border",
									"rounded",
									"border-sky-300",
									"py-1",
									"px-2",
								])}
							>
								<div>{entity.name}</div>
								<div className={"text-md font-bold text-slate-500"}>
									x{toHumanNumber({ number: entity.amount })}
								</div>
							</div>
						);
					}}
				/>
			);
		},
		size: 32,
	}),
];

export namespace BlueprintProductionTable {
	export interface Props extends Table.PropsEx<Data> {
		blueprintId: string;
	}
}

export const BlueprintProductionTable: FC<BlueprintProductionTable.Props> = ({
	blueprintId,
	table,
	...props
}) => {
	const invalidator = useInvalidator([
		["Blueprint"],
		["Blueprint_Production"],
		["Blueprint_Production_Requirement"],
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
								label={<Tx label={"Create blueprint production (menu)"} />}
								textTitle={<Tx label={"Create blueprint production (modal)"} />}
								icon={ProductionIcon}
							>
								{({ close }) => {
									return (
										<BlueprintProductionForm
											mutation={useMutation({
												async mutationFn(values) {
													return kysely.transaction().execute(async (tx) => {
														const entity = await tx
															.insertInto("Blueprint_Production")
															.values({
																id: genId(),
																...values,
																blueprintId,
															})
															.returningAll()
															.executeTakeFirstOrThrow();

														return entity;
													});
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
								textTitle={<Tx label={"Edit blueprint production (modal)"} />}
								icon={ProductionIcon}
							>
								<BlueprintProductionForm
									defaultValues={data}
									mutation={useMutation({
										async mutationFn(values) {
											return kysely.transaction().execute(async (tx) => {
												return tx
													.updateTable("Blueprint_Production")
													.set(values)
													.where("id", "=", data.id)
													.returningAll()
													.executeTakeFirstOrThrow();
											});
										},
										async onSuccess() {
											await invalidator();
										},
									})}
								/>
							</ActionModal>

							<ActionModal
								label={<Tx label={"Move production to (menu)"} />}
								textTitle={<Tx label={"Move production to (modal)"} />}
								icon={ResourceIcon}
							>
								{({ close }) => {
									return (
										<MoveProductionToForm
											mutation={useMutation({
												async mutationFn(values) {
													return kysely.transaction().execute(async (tx) => {
														await tx
															.updateTable("Blueprint_Production")
															.set({
																blueprintId: values.blueprintId,
															})
															.where("id", "=", data.id)
															.execute();
													});
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
								textTitle={<Tx label={"Delete blueprint production (modal)"} />}
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
												.deleteFrom("Blueprint_Production")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={
										<Tx label={"Delete blueprint production (content)"} />
									}
									textToast={"Delete blueprint production"}
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
