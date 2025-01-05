import {
    ActionMenu,
    ActionModal,
    DeleteControl,
    Table,
    toast,
    TrashIcon,
    Tx,
    useCreateMutation,
    usePatchMutation,
    useTable,
    withColumn,
} from "@use-pico/client";
import type { FC } from "react";
import { BuildingResourceForm } from "~/app/derivean/building/resource/BuildingResourceForm";
import { BuildingResourceSchema } from "~/app/derivean/building/resource/BuildingResourceSchema";
import { BuildingResourceSource } from "~/app/derivean/building/resource/BuildingResourceSource";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourceLimitInline } from "~/app/derivean/resource/ResourceLimitInline";

const column = withColumn<BuildingResourceSchema["~output"]>();

const columns = [
	column({
		name: "building.baseBuilding.name",
		header() {
			return <Tx label={"Building name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		filter: {
			path: "buildingId",
			onFilter({ data, filter }) {
				filter.shallow("buildingId", data.buildingId);
			},
		},
		size: 15,
	}),
	column({
		name: "resource.name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		filter: {
			path: "resourceId",
			onFilter({ data, filter }) {
				filter.shallow("resourceId", data.resourceId);
			},
		},
		size: 18,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ data, value }) {
			return (
				<ResourceLimitInline
					limits={data.building.baseBuilding.limits}
					resourceId={data.resourceId}
					amount={value}
				/>
			);
		},
		size: 18,
	}),
];

export namespace BuildingResourceTable {
	export interface Props
		extends Table.PropsEx<BuildingResourceSchema["~output"]> {
		buildingId?: string;
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
								label={<Tx label={"Create resource item (menu)"} />}
								textTitle={<Tx label={"Create resource item (modal)"} />}
								icon={ResourceIcon}
								hidden={Boolean(!buildingId)}
							>
								<BuildingResourceForm
									mutation={useCreateMutation({
										source: BuildingResourceSource,
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving resource item (label)"} />,
												success: (
													<Tx
														label={"Resource item successfully saved (label)"}
													/>
												),
												error: (
													<Tx label={"Cannot save resource item (label)"} />
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
						</ActionMenu>
					);
				},
				row({ data }) {
					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Edit resource item (menu)"} />}
								textTitle={<Tx label={"Edit resource item (modal)"} />}
								icon={ResourceIcon}
							>
								<BuildingResourceForm
									defaultValues={data}
									mutation={usePatchMutation({
										source: BuildingResourceSource,
										async wrap(callback) {
											return toast.promise(callback(), {
												loading: <Tx label={"Saving resource item (label)"} />,
												success: (
													<Tx
														label={"Resource item successfully saved (label)"}
													/>
												),
												error: (
													<Tx label={"Cannot save resource item (label)"} />
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
								label={<Tx label={"Delete resource item (label)"} />}
								textTitle={<Tx label={"Delete resource item (modal)"} />}
								css={{
									base: [
										"text-red-500",
										"hover:text-red-600",
										"hover:bg-red-50",
									],
								}}
							>
								<DeleteControl
									source={BuildingResourceSource}
									textContent={<Tx label={"Resource item delete (content)"} />}
									filter={{
										id: data.id,
									}}
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
