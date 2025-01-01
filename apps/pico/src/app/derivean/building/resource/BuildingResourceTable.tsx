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
import { BuildingResourceForm } from "~/app/derivean/building/resource/BuildingResourceForm";
import { BuildingResourceRepository } from "~/app/derivean/building/resource/BuildingResourceRepository";
import type { BuildingResourceSchema } from "~/app/derivean/building/resource/BuildingResourceSchema";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

const column =
	withColumn<withRepositorySchema.Output<BuildingResourceSchema>>();

const columns = [
	column({
		name: "resource.name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 18,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 18,
	}),
];

export namespace BuildingResourceTable {
	export interface Props
		extends Table.PropsEx<withRepositorySchema.Output<BuildingResourceSchema>> {
		buildingId: string;
	}
}

export const BuildingResourceTable: FC<BuildingResourceTable.Props> = ({
	buildingId,
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
								label={<Tx label={"Create storage item (menu)"} />}
								textTitle={<Tx label={"Create storage item (modal)"} />}
								icon={ResourceIcon}
							>
								<BuildingResourceForm
									mutation={BuildingResourceRepository.useCreateMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving storage item (label)"} />,
												success: (
													<Tx
														label={"Storage item successfully saved (label)"}
													/>
												),
												error: (
													<Tx label={"Cannot save storage item (label)"} />
												),
											});
										},
										async toCreate({ shape }) {
											return {
												entity: {
													...shape,
													buildingId,
												},
											};
										},
									})}
									onSuccess={async ({ modalContext }) => {
										modalContext?.close();
									}}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete storage item (label)"} />}
								textTitle={<Tx label={"Delete storage item (modal)"} />}
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
									repository={BuildingResourceRepository}
									textContent={<Tx label={"Storage item delete (content)"} />}
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
								label={<Tx label={"Edit storage item (menu)"} />}
								textTitle={<Tx label={"Edit storage item (modal)"} />}
								icon={ResourceIcon}
							>
								<BuildingResourceForm
									defaultValues={data}
									mutation={BuildingResourceRepository.usePatchMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving storage item (label)"} />,
												success: (
													<Tx
														label={"Storage item successfully saved (label)"}
													/>
												),
												error: (
													<Tx label={"Cannot save storage item (label)"} />
												),
											});
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
										modalContext?.close();
									}}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete storage item (label)"} />}
								textTitle={<Tx label={"Delete storage item (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									repository={BuildingResourceRepository}
									textContent={<Tx label={"Storage item delete (content)"} />}
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
