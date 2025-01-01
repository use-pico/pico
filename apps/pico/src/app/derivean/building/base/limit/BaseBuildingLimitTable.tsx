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
import { BaseBuildingLimitForm } from "~/app/derivean/building/base/limit/BaseBuildingLimitForm";
import { BaseBuildingLimitRepository } from "~/app/derivean/building/base/limit/BaseBuildingLimitRepository";
import type { BaseBuildingLimitSchema } from "~/app/derivean/building/base/limit/BaseBuildingLimitSchema";
import { StorageIcon } from "~/app/derivean/icon/StorageIcon";

const column =
	withColumn<withRepositorySchema.Output<BaseBuildingLimitSchema>>();

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

export namespace BaseBuildingLimitTable {
	export interface Props
		extends Table.PropsEx<
			withRepositorySchema.Output<BaseBuildingLimitSchema>
		> {
		baseBuildingId: string;
	}
}

export const BaseBuildingLimitTable: FC<BaseBuildingLimitTable.Props> = ({
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
								<BaseBuildingLimitForm
									mutation={BaseBuildingLimitRepository.useCreateMutation({
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
									repository={BaseBuildingLimitRepository}
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
								<BaseBuildingLimitForm
									defaultValues={data}
									mutation={BaseBuildingLimitRepository.usePatchMutation({
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
									repository={BaseBuildingLimitRepository}
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
