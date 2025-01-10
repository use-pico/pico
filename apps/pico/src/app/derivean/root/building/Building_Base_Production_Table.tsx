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
import { Building_Base_Production_Form } from "~/app/derivean/root/building/Building_Base_Production_Form";
import { RequirementsInline } from "~/app/derivean/root/resource/ResourceInline";
import type { Building_Base_Production_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Production_Requirement_Schema";

export namespace Building_Base_Production_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		resourceId: string;
		amount: number;
		limit: number;
		cycles: number;
		requirements: (Building_Base_Production_Requirement_Schema["~entity"] & {
			name: string;
		})[];
	}
}

const column = withColumn<Building_Base_Production_Table.Data>();

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
						"/$locale/apps/derivean/root/building/base/production/$id/requirements"
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
					limit={5}
				/>
			);
		},
		size: 32,
	}),
];

export namespace Building_Base_Production_Table {
	export interface Props extends Table.PropsEx<Data> {
		buildingBaseId: string;
	}
}

export const Building_Base_Production_Table: FC<
	Building_Base_Production_Table.Props
> = ({ buildingBaseId, table, ...props }) => {
	const invalidator = useInvalidator([
		["Building_Base_Production"],
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
								label={<Tx label={"Create building base production (menu)"} />}
								textTitle={
									<Tx label={"Create building base production (modal)"} />
								}
								icon={ProductionIcon}
							>
								{({ close }) => {
									return (
										<Building_Base_Production_Form
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															const entity = await tx
																.insertInto("Building_Base_Production")
																.values({
																	id: genId(),
																	...values,
																	buildingBaseId,
																})
																.returningAll()
																.executeTakeFirstOrThrow();

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
				},
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
								<Building_Base_Production_Form
									defaultValues={data}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.updateTable("Building_Base_Production")
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
												.deleteFrom("Building_Base_Production")
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
