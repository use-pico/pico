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
import { id, toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/db";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourceRequirementForm } from "~/app/derivean/root/resource/requirement/ResourceRequirementForm";

interface Data extends IdentitySchema.Type {
	name: string;
	resourceId: string;
	requirementId: string;
	amount: number;
	passive: boolean;
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
		size: 14,
	}),
	column({
		name: "passive",
		header() {
			return <Tx label={"Passive requirement (label)"} />;
		},
		render({ value }) {
			return <BoolInline value={value} />;
		},
		size: 14,
	}),
];

export namespace ResourceRequirementTable {
	export interface Props extends Table.PropsEx<Data> {
		resourceId: string;
	}
}

export const ResourceRequirementTable: FC<ResourceRequirementTable.Props> = ({
	resourceId,
	table,
	...props
}) => {
	const invalidator = useInvalidator([["Resource_Requirement"]]);

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
								<ResourceRequirementForm
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.insertInto("Resource_Requirement")
														.values({
															id: id(),
															...values,
															resourceId,
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
								<ResourceRequirementForm
									defaultValues={data}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute(async (tx) => {
													return tx
														.updateTable("Resource_Requirement")
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
												.deleteFrom("Resource_Requirement")
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
