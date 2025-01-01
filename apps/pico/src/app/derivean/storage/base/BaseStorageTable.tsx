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
import type { withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import { StorageIcon } from "~/app/derivean/icon/StorageIcon";
import { BaseStorageForm } from "~/app/derivean/storage/base/BaseStorageForm";
import { BaseStorageRepository } from "~/app/derivean/storage/base/BaseStorageRepository";
import type { BaseStorageSchema } from "~/app/derivean/storage/base/BaseStorageSchema";

const column = withColumn<withRepositorySchema.Output<BaseStorageSchema>>();

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
		name: "limit",
		header() {
			return <Tx label={"Storage limit (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 18,
	}),
];

export namespace BaseStorageTable {
	export interface Props
		extends Table.PropsEx<withRepositorySchema.Output<BaseStorageSchema>> {
		baseBuildingId: string;
	}
}

export const BaseStorageTable: FC<BaseStorageTable.Props> = ({
	baseBuildingId,
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
								label={<Tx label={"Create base storage (menu)"} />}
								textTitle={<Tx label={"Create base storage (modal)"} />}
								icon={StorageIcon}
							>
								<BaseStorageForm
									mutation={BaseStorageRepository.useCreateMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving base storage (label)"} />,
												success: (
													<Tx
														label={"Base storage successfully saved (label)"}
													/>
												),
												error: (
													<Tx label={"Cannot save base storage (label)"} />
												),
											});
										},
										async toCreate({ shape }) {
											return {
												entity: {
													...shape,
													baseBuildingId,
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
								label={<Tx label={"Delete base storage (label)"} />}
								textTitle={<Tx label={"Delete base storage (modal)"} />}
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
									repository={BaseStorageRepository}
									textContent={<Tx label={"Base storage delete (content)"} />}
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
								label={<Tx label={"Edit base storage (menu)"} />}
								textTitle={<Tx label={"Edit base storage (modal)"} />}
								icon={StorageIcon}
							>
								<BaseStorageForm
									defaultValues={data}
									mutation={BaseStorageRepository.usePatchMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving base storage (label)"} />,
												success: (
													<Tx
														label={"Base storage successfully saved (label)"}
													/>
												),
												error: (
													<Tx label={"Cannot save base storage (label)"} />
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
								label={<Tx label={"Delete base storage (label)"} />}
								textTitle={<Tx label={"Delete base storage (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									repository={BaseStorageRepository}
									textContent={<Tx label={"Base storage delete (content)"} />}
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
