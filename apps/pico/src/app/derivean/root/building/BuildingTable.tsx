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
import { kysely } from "~/app/derivean/db/db";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { BuildingForm } from "~/app/derivean/root/building/BuildingForm";

interface Data extends IdentitySchema.Type {
	name: string;
	buildingBaseId: string;
}

const column = withColumn<Data>();

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

export namespace BuildingTable {
	export interface Props extends Table.PropsEx<Data> {
		userId?: string;
	}
}

export const BuildingTable: FC<BuildingTable.Props> = ({
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
										<BuildingForm
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
											})}
											onSuccess={async ({ modalContext }) => {
												await invalidator();
												modalContext?.close();
											}}
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
								<BuildingForm
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
									})}
									onSuccess={async ({ modalContext }) => {
										await invalidator();
										modalContext?.close();
									}}
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
