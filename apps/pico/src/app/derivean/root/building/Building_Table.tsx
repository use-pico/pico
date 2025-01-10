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
import { genId, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { Building_Form } from "~/app/derivean/root/building/Building_Form";

export namespace Building_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		buildingBaseId: string;
	}
}

const column = withColumn<Building_Table.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Building name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<div className={"flex flex-row gap-2"}>
					<LinkTo
						icon={BuildingBaseIcon}
						to={"/$locale/apps/derivean/root/building/base/$id/view"}
						params={{ locale, id: data.buildingBaseId }}
					/>

					<LinkTo
						to={"/$locale/apps/derivean/root/building/$id/view"}
						params={{ locale, id: data.id }}
					>
						{value}
					</LinkTo>
				</div>
			);
		},
		size: 14,
	}),
];

export namespace Building_Table {
	export interface Props extends Table.PropsEx<Data> {
		userId?: string;
	}
}

export const Building_Table: FC<Building_Table.Props> = ({
	userId,
	table,
	...props
}) => {
	const invalidator = useInvalidator([["Building"]]);

	return (
		<Table
			table={useTable({
				...table,
				columns,
			})}
			action={{
				table:
					userId ?
						() => {
							return (
								<ActionMenu>
									<ActionModal
										label={<Tx label={"Create building (menu)"} />}
										textTitle={<Tx label={"Create building (modal)"} />}
										icon={ResourceIcon}
									>
										<Building_Form
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute((tx) => {
															return tx
																.insertInto("Building")
																.values({
																	id: genId(),
																	...values,
																	userId,
																})
																.returningAll()
																.executeTakeFirstOrThrow();
														}),
														withToastPromiseTx("Create building"),
													);
												},
												async onSuccess() {
													await invalidator();
												},
											})}
										/>
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
								textTitle={<Tx label={"Edit building (modal)"} />}
								icon={BuildingIcon}
							>
								<Building_Form
									defaultValues={data}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute((tx) => {
													return tx
														.updateTable("Building")
														.set(values)
														.where("id", "=", data.id)
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Edit building"),
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
												.deleteFrom("Building")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={<Tx label={"Building delete (content)"} />}
									textToast={"Building delete"}
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
