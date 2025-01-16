import { useMutation, useQuery } from "@tanstack/react-query";
import {
    ActionMenu,
    ActionModal,
    Button,
    DeleteControl,
    LoadingOverlay,
    Modal,
    Table,
    toast,
    TrashIcon,
    Tx,
    useInvalidator,
    useTable,
    withColumn,
    withListCount,
    withToastPromiseTx,
} from "@use-pico/client";
import {
    genId,
    toHumanNumber,
    withBoolSchema,
    type IdentitySchema,
} from "@use-pico/common";
import { useState, type FC } from "react";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { RequirementIcon } from "~/app/derivean/icon/RequirementIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { BlueprintProductionForm } from "~/app/derivean/root/BlueprintProductionForm";
import { BlueprintProductionRequirementTable } from "~/app/derivean/root/BlueprintProductionRequirementTable";
import { MoveProductionToForm } from "~/app/derivean/root/MoveProductionToForm";
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
			return (
				<Modal
					target={
						<Button
							iconEnabled={RequirementIcon}
							variant={{ variant: "subtle" }}
						>
							{value}
						</Button>
					}
					outside={true}
					textTitle={<Tx label={"Blueprint production requirements (modal)"} />}
					css={{
						modal: ["w-2/3"],
					}}
				>
					{() => {
						const [page, setPage] = useState(0);
						const [size, setSize] = useState(15);

						const result = useQuery({
							queryKey: [
								"Blueprint_Production_Requirement",
								data.id,
								{ page, size },
							],
							async queryFn() {
								return kysely.transaction().execute(async (tx) => {
									return withListCount({
										select: tx
											.selectFrom("Blueprint_Production_Requirement as bpr")
											.innerJoin("Resource as r", "r.id", "bpr.resourceId")
											.select([
												"bpr.id",
												"r.name",
												"bpr.resourceId",
												"bpr.amount",
												"bpr.passive",
											])
											.where("bpr.blueprintProductionId", "=", data.id)
											.orderBy("r.name", "asc"),
										query({ select, where }) {
											let $select = select;

											if (where?.id) {
												$select = $select.where("bpr.id", "=", where.id);
											}
											if (where?.idIn) {
												$select = $select.where("bpr.id", "in", where.idIn);
											}

											return $select;
										},
										output: z.object({
											id: z.string().min(1),
											name: z.string().min(1),
											resourceId: z.string().min(1),
											amount: z.number().nonnegative(),
											passive: withBoolSchema(),
										}),
										cursor: {
											page,
											size,
										},
									});
								});
							},
						});

						return (
							result.isLoading ? <LoadingOverlay />
							: result.isSuccess ?
								<BlueprintProductionRequirementTable
									blueprintProductionId={data.id}
									table={{
										data: result.data.data,
									}}
									cursor={{
										count: result.data.count,
										cursor: {
											page,
											size,
										},
										textTotal: (
											<Tx label={"Number of required items (label)"} />
										),
										onPage(page) {
											setPage(page);
										},
										onSize(size) {
											setSize(size);
										},
									}}
								/>
							:	"boom"
						);
					}}
				</Modal>
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
								label={<Tx label={"Move production to (menu)"} />}
								textTitle={<Tx label={"Move production to (modal)"} />}
								icon={ResourceIcon}
							>
								{({ close }) => {
									return (
										<MoveProductionToForm
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															await tx
																.updateTable("Blueprint_Production")
																.set({
																	blueprintId: values.blueprintId,
																})
																.where("id", "=", data.id)
																.execute();
														}),
														withToastPromiseTx("Move production to"),
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
