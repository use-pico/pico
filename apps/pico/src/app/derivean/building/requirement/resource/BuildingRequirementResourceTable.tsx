import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    Table,
    toast,
    TrashIcon,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber, type withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import { BuildingRequirementResourceForm } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceForm";
import { BuildingRequirementResourceRepository } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceRepository";
import type { BuildingRequirementResourceSchema } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceSchema";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

const column =
	withColumn<withRepositorySchema.Output<BuildingRequirementResourceSchema>>();

const columns = [
	column({
		name: "resource.name",
		header() {
			return <Tx label={"Resource name (label)"} />;
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
		name: "resource.description",
		header() {
			return <Tx label={"Resource description (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 24,
	}),
];

export namespace BuildingRequirementResourceTable {
	export interface Props
		extends Table.PropsEx<
			withRepositorySchema.Output<BuildingRequirementResourceSchema>
		> {
		baseBuildingId: string;
	}
}

export const BuildingRequirementResourceTable: FC<
	BuildingRequirementResourceTable.Props
> = ({ baseBuildingId, table, ...props }) => {
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
								label={<Tx label={"Create resource requirement (menu)"} />}
								textTitle={<Tx label={"Create resource requirement (modal)"} />}
								icon={ResourceIcon}
							>
								<BuildingRequirementResourceForm
									mutation={BuildingRequirementResourceRepository.useCreateMutation(
										{
											async wrap(callback) {
												return toast.promise(callback(), {
													loading: (
														<Tx label={"Saving resource requirement (label)"} />
													),
													success: (
														<Tx
															label={
																"Resource requirement successfully saved (label)"
															}
														/>
													),
													error: (
														<Tx
															label={"Cannot save resource requirement (label)"}
														/>
													),
												});
											},
											async toCreate({ shape }) {
												return {
													shape: {
														...shape,
														baseBuildingId,
													},
												};
											},
										},
									)}
									onSuccess={async ({ modalContext }) => {
										modalContext?.close();
									}}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete resource requirements (label)"} />}
								textTitle={
									<Tx label={"Delete resource requirements (modal)"} />
								}
								disabled={
									!table.selection || table.selection.value.length === 0
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
									repository={BuildingRequirementResourceRepository}
									textContent={
										<Tx label={"Resource requirements delete (content)"} />
									}
									idIn={table.selection?.value}
								/>
							</ActionModal>
						</ActionMenu>
					);
				},
				row({ data }) {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Edit resource requirement (menu)"} />}
								textTitle={<Tx label={"Edit resource requirement (modal)"} />}
								icon={ResourceIcon}
							>
								<BuildingRequirementResourceForm
									defaultValues={data}
									mutation={BuildingRequirementResourceRepository.usePatchMutation(
										{
											async wrap(callback) {
												return toast.promise(callback(), {
													loading: (
														<Tx label={"Saving resource requirement (label)"} />
													),
													success: (
														<Tx
															label={
																"Resource requirement successfully saved (label)"
															}
														/>
													),
													error: (
														<Tx
															label={"Cannot save resource requirement (label)"}
														/>
													),
												});
											},
											async toPatch({ shape }) {
												return {
													shape,
													filter: {
														id: data.id,
													},
												};
											},
										},
									)}
									onSuccess={async ({ modalContext }) => {
										modalContext?.close();
									}}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete resource requirement (label)"} />}
								textTitle={<Tx label={"Delete resource requirement (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									repository={BuildingRequirementResourceRepository}
									textContent={
										<Tx label={"resource requirement delete (content)"} />
									}
									idIn={[data.id]}
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
