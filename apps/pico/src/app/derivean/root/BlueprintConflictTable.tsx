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
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { BlueprintConflictForm } from "~/app/derivean/root/BlueprintConflictForm";
import { withBlueprintSort } from "~/app/derivean/service/withBlueprintSort";

export namespace BlueprintConflictTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		blueprintId: string;
		conflictId: string;
	}
}

const column = withColumn<BlueprintConflictTable.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Conflict building (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					icon={BlueprintIcon}
					to={"/$locale/apps/derivean/root/blueprint/$id/conflicts"}
					params={{ locale, id: data.conflictId }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 22,
	}),
];

export namespace BlueprintConflictTable {
	export interface Props extends Table.PropsEx<Data> {
		blueprintId: string;
	}
}

export const BlueprintConflictTable: FC<BlueprintConflictTable.Props> = ({
	blueprintId,
	table,
	...props
}) => {
	const invalidator = useInvalidator([["Blueprint_Conflict"], ["Blueprint"]]);

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
								label={<Tx label={"Create blueprint conflict (menu)"} />}
								textTitle={<Tx label={"Create blueprint conflict (modal)"} />}
								icon={BlueprintIcon}
							>
								{({ close }) => {
									return (
										<BlueprintConflictForm
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															const entity = tx
																.insertInto("Blueprint_Conflict")
																.values({
																	id: genId(),
																	...values,
																	blueprintId,
																})
																.returningAll()
																.executeTakeFirstOrThrow();

															await withBlueprintSort({
																tx,
															});

															return entity;
														}),
														withToastPromiseTx("Create blueprint conflict"),
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
								textTitle={<Tx label={"Edit blueprint conflict (modal)"} />}
								icon={BlueprintIcon}
							>
								{({ close }) => {
									return (
										<BlueprintConflictForm
											defaultValues={data}
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															return tx
																.updateTable("Blueprint_Conflict")
																.set(values)
																.where("id", "=", data.id)
																.returningAll()
																.executeTakeFirstOrThrow();
														}),
														withToastPromiseTx("Update blueprint conflict"),
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
								textTitle={<Tx label={"Delete blueprint conflict (modal)"} />}
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
												.deleteFrom("Blueprint_Conflict")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={
										<Tx label={"Delete blueprint conflict (content)"} />
									}
									textToast={"Delete blueprint conflict"}
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
