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
import {
    genId,
    toHumanNumber,
    type Entity,
    type IdentitySchema,
} from "@use-pico/common";
import type { Transaction } from "kysely";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { Database } from "~/app/derivean/db/sdk";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import type { ResourceProductionSchema } from "~/app/derivean/resource/production/ResourceProductionSchema";
import { ResourceProductionForm } from "~/app/derivean/root/resource/production/ResourceProductionForm";

interface Data extends IdentitySchema.Type {
	name: string;
	resourceId: string;
	amount: number;
	limit: number;
	cycles: number;
	// requirements: (ResourceProductionRequirementSchema["~entity"] & {
	// 	name: string;
	// })[];
}

const column = withColumn<Data>();

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
					to={"/$locale/apps/derivean/root/resource/production/$id/view"}
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
	// column({
	// 	name: "requirements",
	// 	header() {
	// 		return <Tx label={"Required resources (label)"} />;
	// 	},
	// 	render({ value }) {
	// 		return (
	// 			<RequirementsInline
	// 				textTitle={<Tx label={"Resource requirements (title)"} />}
	// 				textEmpty={<Tx label={"No requirements (label)"} />}
	// 				requirements={value}
	// 				// diff={missing}
	// 				limit={5}
	// 			/>
	// 		);
	// 	},
	// 	size: 72,
	// }),
];

export namespace ResourceProductionTable {
	export namespace onCreate {
		export interface Props
			extends Entity.Schema<ResourceProductionSchema["entity"]> {
			tx: Transaction<Database>;
		}
	}

	export interface Props extends Table.PropsEx<Data> {
		onCreate?(props: onCreate.Props): Promise<any>;
	}
}

export const ResourceProductionTable: FC<ResourceProductionTable.Props> = ({
	onCreate,
	table,
	...props
}) => {
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
				table:
					onCreate ?
						() => {
							return (
								<ActionMenu>
									<ActionModal
										label={
											<Tx label={"Create building base production (menu)"} />
										}
										textTitle={
											<Tx label={"Create building base production (modal)"} />
										}
										icon={ProductionIcon}
									>
										{({ close }) => {
											return (
												<ResourceProductionForm
													mutation={useMutation({
														async mutationFn(values) {
															return toast.promise(
																kysely.transaction().execute(async (tx) => {
																	const entity = await tx
																		.insertInto("Resource_Production")
																		.values({
																			id: genId(),
																			...values,
																		})
																		.returningAll()
																		.executeTakeFirstOrThrow();

																	await onCreate({ tx, entity });

																	return entity;
																}),
																withToastPromiseTx(
																	"Create building base production",
																),
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
						}
					:	undefined,
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
										async onSuccess() {
											await invalidator();
										},
									})}
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
												.deleteFrom("Resource_Production")
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
