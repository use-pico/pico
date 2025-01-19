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
import { BlueprintProductionDependencyForm } from "~/app/derivean/root/BlueprintProductionDependencyForm";
import { withBlueprintSort } from "~/app/derivean/service/withBlueprintSort";

export namespace BlueprintProductionDependencyTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		blueprintId: string;
	}
}

const column = withColumn<BlueprintProductionDependencyTable.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Required building (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					icon={BlueprintIcon}
					to={"/$locale/apps/derivean/root/blueprint/$id/view"}
					params={{ locale, id: data.blueprintId }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 22,
	}),
];

export namespace BlueprintProductionDependencyTable {
	export interface Props extends Table.PropsEx<Data> {
		blueprintProductionId: string;
	}
}

export const BlueprintProductionDependencyTable: FC<
	BlueprintProductionDependencyTable.Props
> = ({ blueprintProductionId, table, ...props }) => {
	const invalidator = useInvalidator([
		["Blueprint_Production_Dependency"],
		["Blueprint"],
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
								label={
									<Tx label={"Create blueprint production dependency (menu)"} />
								}
								textTitle={
									<Tx
										label={"Create blueprint production dependency (modal)"}
									/>
								}
								icon={BlueprintIcon}
							>
								{({ close }) => {
									return (
										<BlueprintProductionDependencyForm
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															const entity = tx
																.insertInto("Blueprint_Production_Dependency")
																.values({
																	id: genId(),
																	...values,
																	blueprintProductionId,
																})
																.returningAll()
																.executeTakeFirstOrThrow();

															await withBlueprintSort({
																tx,
															});

															return entity;
														}),
														withToastPromiseTx(
															"Create blueprint production dependency",
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
									<Tx label={"Edit blueprint production dependency (modal)"} />
								}
								icon={BlueprintIcon}
							>
								{({ close }) => {
									return (
										<BlueprintProductionDependencyForm
											defaultValues={data}
											mutation={useMutation({
												async mutationFn(values) {
													return toast.promise(
														kysely.transaction().execute(async (tx) => {
															return tx
																.updateTable("Blueprint_Production_Dependency")
																.set(values)
																.where("id", "=", data.id)
																.returningAll()
																.executeTakeFirstOrThrow();
														}),
														withToastPromiseTx(
															"Update blueprint production dependency",
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

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete (menu)"} />}
								textTitle={
									<Tx
										label={"Delete blueprint production dependency (modal)"}
									/>
								}
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
												.deleteFrom("Blueprint_Production_Dependency")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={
										<Tx
											label={"Delete blueprint production dependency (content)"}
										/>
									}
									textToast={"Delete blueprint production dependency"}
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
