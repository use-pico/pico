import {
    ActionMenu,
    ActionModal,
    BoolInline,
    DeleteControl,
    Table,
    toast,
    TrashIcon,
    Tx,
    useCreateMutation,
    usePatchMutation,
    useSourceInvalidator,
    useTable,
    withColumn,
    withToastPromiseTx,
} from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import { BuildingBaseSource } from "~/app/derivean/building/base/BuildingBaseSource";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import type { ResourceRequirementSchema } from "~/app/derivean/resource/requirement/ResourceRequirementSchema";
import { ResourceRequirementSource } from "~/app/derivean/resource/requirement/ResourceRequirementSource";
import { ResourceRequirementForm } from "~/app/derivean/root/resource/requirement/ResourceRequirementForm";

const column = withColumn<ResourceRequirementSchema["~output"]>();

const columns = [
	column({
		name: "requirement.name",
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
	export interface Props
		extends Table.PropsEx<ResourceRequirementSchema["~output"]> {
		resourceId: string;
	}
}

export const ResourceRequirementTable: FC<ResourceRequirementTable.Props> = ({
	resourceId,
	table,
	...props
}) => {
	const invalidator = useSourceInvalidator({
		sources: [ResourceRequirementSource, BuildingBaseSource],
	});

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
									source={ResourceRequirementSource}
									textContent={
										<Tx label={"Requirement item delete (content)"} />
									}
									filter={{
										id: data.id,
									}}
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
