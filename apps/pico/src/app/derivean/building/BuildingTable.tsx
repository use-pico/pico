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
import type { FC } from "react";
import { BuildingForm } from "~/app/derivean/building/BuildingForm";
import { BuildingRepository } from "~/app/derivean/building/BuildingRepository";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

const column = withColumn<BuildingSchema["~output"]>();

const columns = [
	column({
		name: "baseBuilding.name",
		header() {
			return <Tx label={"Base building name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/building/$id/view"}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 14,
	}),
];

export namespace BuildingTable {
	export interface Props extends Table.PropsEx<BuildingSchema["~output"]> {
		userId: string;
	}
}

export const BuildingTable: FC<BuildingTable.Props> = ({
	userId,
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
								label={<Tx label={"Create building (menu)"} />}
								textTitle={<Tx label={"Create building (modal)"} />}
								icon={ResourceIcon}
							>
								<BuildingForm
									mutation={BuildingRepository.useCreateMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving building (label)"} />,
												success: (
													<Tx label={"Building successfully saved (label)"} />
												),
												error: <Tx label={"Cannot save building (label)"} />,
											});
										},
										async toCreate({ shape }) {
											return {
												entity: {
													...shape,
													userId,
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
								label={<Tx label={"Delete building (label)"} />}
								textTitle={<Tx label={"Delete buildings (modal)"} />}
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
									repository={BuildingRepository}
									textContent={<Tx label={"Building delete (content)"} />}
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
								label={<Tx label={"Edit building (menu)"} />}
								textTitle={<Tx label={"Edit building (modal)"} />}
								icon={BuildingIcon}
							>
								<BuildingForm
									defaultValues={data}
									mutation={BuildingRepository.usePatchMutation({
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving building (label)"} />,
												success: (
													<Tx label={"Building successfully saved (label)"} />
												),
												error: <Tx label={"Cannot save building (label)"} />,
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
								label={<Tx label={"Delete building (label)"} />}
								textTitle={<Tx label={"Delete building (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									repository={BuildingRepository}
									textContent={<Tx label={"Building delete (content)"} />}
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
