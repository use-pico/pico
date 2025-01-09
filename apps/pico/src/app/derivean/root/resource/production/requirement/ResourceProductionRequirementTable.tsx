import { useMutation } from "@tanstack/react-query";
import {
    ActionMenu,
    ActionModal,
    BoolInline,
    DeleteControl,
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
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourceProductionRequirementForm } from "~/app/derivean/root/resource/production/requirement/ResourceProductionRequirementForm";

interface Data extends IdentitySchema.Type {
	name: string;
	resourceId: string;
	amount: number;
	passive: boolean;
	level: number;
}

const column = withColumn<Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Requirement name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 12,
	}),
	column({
		name: "level",
		header() {
			return <Tx label={"Level (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
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
		name: "passive",
		header() {
			return <Tx label={"Passive requirement (label)"} />;
		},
		render({ value }) {
			return <BoolInline value={value} />;
		},
		size: 10,
	}),
];

export namespace ResourceProductionRequirementTable {
	export interface Props extends Table.PropsEx<Data> {
		resourceId: string;
	}
}

export const ResourceProductionRequirementTable: FC<
	ResourceProductionRequirementTable.Props
> = ({ resourceId, table, ...props }) => {
	const invalidator = useInvalidator([["Resource_Production_Requirement"]]);

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
								label={<Tx label={"Create requirement item (menu)"} />}
								textTitle={<Tx label={"Create requirement item (modal)"} />}
								icon={ResourceIcon}
							>
								<ResourceProductionRequirementForm
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.insertInto("Resource_Production_Requirement")
														.values({
															id: genId(),
															...values,
															resourceId,
															level: 1,
														})
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Create requirement item"),
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
				},
				row({ data }) {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Edit (menu)"} />}
								textTitle={<Tx label={"Edit requirement item (modal)"} />}
								icon={ResourceIcon}
							>
								<ResourceProductionRequirementForm
									defaultValues={data}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.updateTable("Resource_Production_Requirement")
														.set(values)
														.where("id", "=", data.id)
														.returningAll()
														.executeTakeFirstOrThrow();
												}),
												withToastPromiseTx("Update requirement item"),
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
								textTitle={<Tx label={"Delete requirement item (modal)"} />}
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
												.deleteFrom("Resource_Production_Requirement")
												.where("id", "=", data.id)
												.execute();
										});
									}}
									textContent={
										<Tx label={"Requirement item delete (content)"} />
									}
									textToast={"Requirement item delete"}
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
