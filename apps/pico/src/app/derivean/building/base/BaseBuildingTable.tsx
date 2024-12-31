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
    useTable,
    withColumn,
} from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import { BaseBuildingForm } from "~/app/derivean/building/base/BaseBuildingForm";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { BaseBuildingIcon } from "~/app/derivean/icon/BaseBuildingIcon";

const column = withColumn<withRepositorySchema.Output<BaseBuildingSchema>>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Base building name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/building/base/$id/view"}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 14,
	}),
	column({
		name: "description",
		header() {
			return <Tx label={"Base building description (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 24,
	}),
];

export namespace BaseBuildingTable {
	export interface Props
		extends Table.PropsEx<withRepositorySchema.Output<BaseBuildingSchema>> {
		//
	}
}

export const BaseBuildingTable: FC<BaseBuildingTable.Props> = ({
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
								label={<Tx label={"Create base building (menu)"} />}
								textTitle={<Tx label={"Create base building (modal)"} />}
								icon={BaseBuildingIcon}
							>
								<BaseBuildingForm
									mutation={BaseBuildingRepository.useCreateMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving base building (label)"} />,
												success: (
													<Tx
														label={"Base building successfully saved (label)"}
													/>
												),
												error: (
													<Tx label={"Cannot save base building (label)"} />
												),
											});
										},
									})}
									onSuccess={async ({ modalContext }) => {
										modalContext?.close();
									}}
								/>
							</ActionModal>

							<ActionModal
								icon={TrashIcon}
								label={<Tx label={"Delete base buildings (label)"} />}
								textTitle={<Tx label={"Delete base buildings (modal)"} />}
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
									repository={BaseBuildingRepository}
									textContent={<Tx label={"Base building delete (content)"} />}
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
								label={<Tx label={"Edit base building (menu)"} />}
								textTitle={<Tx label={"Edit base building (modal)"} />}
								icon={BaseBuildingIcon}
							>
								<BaseBuildingForm
									defaultValues={data}
									mutation={BaseBuildingRepository.usePatchMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving base building (label)"} />,
												success: (
													<Tx
														label={"Base building successfully saved (label)"}
													/>
												),
												error: (
													<Tx label={"Cannot save base building (label)"} />
												),
											});
										},
										async toPatch({ shape }) {
											return {
												entity: shape,
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
								label={<Tx label={"Delete base building (label)"} />}
								textTitle={<Tx label={"Delete base building (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									repository={BaseBuildingRepository}
									textContent={<Tx label={"Base building delete (content)"} />}
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
