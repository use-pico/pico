import {
    ActionMenu,
    ActionModal,
    BoolInline,
    Table,
    TrashIcon,
    Tx,
    useTable,
    withColumn
} from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

interface Data extends IdentitySchema.Type {
	name: string;
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
								{/* <ResourceRequirementForm
									mutation={useCreateMutation({
										source: ResourceRequirementSource,
										async wrap(callback) {
											return toast.promise(
												callback(),
												withToastPromiseTx("Create requirement item"),
											);
										},
										async toCreate({ shape }) {
											return {
												entity: {
													...shape,
													resourceId,
												},
											};
										},
									})}
									onSuccess={async ({ modalContext }) => {
										await invalidator();
										modalContext?.close();
									}}
								/> */}
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
								{/* <ResourceRequirementForm
									defaultValues={data}
									mutation={usePatchMutation({
										source: ResourceRequirementSource,
										async wrap(callback) {
											return toast.promise(
												callback(),
												withToastPromiseTx("Update requirement item"),
											);
										},
										async toPatch() {
											return {
												filter: {
													id: data.id,
												},
											};
										},
									})}
									onSuccess={async ({ modalContext }) => {
										await invalidator();
										modalContext?.close();
									}}
								/> */}
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
								{/* <DeleteControl
									source={ResourceRequirementSource}
									textContent={
										<Tx label={"Requirement item delete (content)"} />
									}
									filter={{
										id: data.id,
									}}
									invalidator={invalidator}
								/> */}
							</ActionModal>
						</ActionMenu>
					);
				},
			}}
			{...props}
		/>
	);
};
