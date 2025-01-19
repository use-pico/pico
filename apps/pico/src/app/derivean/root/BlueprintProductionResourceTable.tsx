import { useMutation } from "@tanstack/react-query";
import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    Table,
    TrashIcon,
    Tx,
    useInvalidator,
    useTable,
    withColumn,
} from "@use-pico/client";
import { genId, toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { BlueprintProductionResourceForm } from "~/app/derivean/root/BlueprintProductionResourceForm";

export namespace BlueprintProductionResourceTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		resourceId: string;
		amount: number;
	}
}

const column = withColumn<BlueprintProductionResourceTable.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Requirement name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		filter: {
			path: "resourceId",
			onFilter({ data, filter }) {
				filter.shallow("resourceID", data.resourceId);
			},
		},
		size: 22,
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
];

export namespace BlueprintProductionResourceTable {
	export interface Props extends Table.PropsEx<Data> {
		blueprintProductionId: string;
	}
}

export const BlueprintProductionResourceTable: FC<
	BlueprintProductionResourceTable.Props
> = ({ blueprintProductionId, table, ...props }) => {
	const invalidator = useInvalidator([
		["Blueprint_Production_Resource"],
		["Blueprint_Production"],
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
								label={
									<Tx label={"Create production resource requirement (menu)"} />
								}
								textTitle={
									<Tx
										label={"Create production resource requirement (modal)"}
									/>
								}
								icon={ResourceIcon}
							>
								{({ close }) => {
									return (
										<BlueprintProductionResourceForm
											mutation={useMutation({
												async mutationFn(values) {
													return kysely.transaction().execute(async (tx) => {
														return tx
															.insertInto("Blueprint_Production_Resource")
															.values({
																id: genId(),
																...values,
																blueprintProductionId,
															})
															.returningAll()
															.executeTakeFirstOrThrow();
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
								textTitle={
									<Tx label={"Edit production resource requirement (modal)"} />
								}
								icon={ResourceIcon}
							>
								{({ close }) => {
									return (
										<BlueprintProductionResourceForm
											defaultValues={data}
											mutation={useMutation({
												async mutationFn(values) {
													return kysely.transaction().execute(async (tx) => {
														return tx
															.updateTable("Blueprint_Production_Resource")
															.set(values)
															.where("id", "=", data.id)
															.returningAll()
															.executeTakeFirstOrThrow();
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
								textTitle={
									<Tx
										label={"Delete production resource requirement (modal)"}
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
												.deleteFrom("Blueprint_Production_Resource")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={
										<Tx
											label={"Delete production resource requirement (content)"}
										/>
									}
									textToast={"Delete production resource requirement item"}
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
