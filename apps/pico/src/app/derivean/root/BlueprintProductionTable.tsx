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
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { BlueprintProductionForm } from "~/app/derivean/root/BlueprintProductionForm";
import { RequirementsInline } from "~/app/derivean/root/RequirementsInline";
import type { BlueprintProductionRequirementSchema } from "~/app/derivean/schema/BlueprintProductionRequirementSchema";

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
					to={
						"/$locale/apps/derivean/root/blueprint/production/$id/requirements"
					}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
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
		name: "cycles",
		header() {
			return <Tx label={"Production cycles (label)"} />;
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
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
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
														}),
														withToastPromiseTx("Create blueprint production"),
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
								textTitle={<Tx label={"Edit blueprint production (modal)"} />}
								icon={ProductionIcon}
							>
								<BlueprintProductionForm
									defaultValues={data}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.updateTable("Blueprint_Production")
														.set(values)
														.where("id", "=", data.id)
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Update blueprint production"),
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
