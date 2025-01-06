import { useParams } from "@tanstack/react-router";
import {
    ActionClick,
    ActionMenu,
    ActionModal,
    DeleteControl,
    LinkTo,
    Table,
    TrashIcon,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import type { FC } from "react";
import { BuildingResourceSchema } from "~/app/derivean/building/resource/BuildingResourceSchema";
import { BuildingResourceSource } from "~/app/derivean/building/resource/BuildingResourceSource";
import { useResourcePickupMutation } from "~/app/derivean/building/useResourcePickupMutation";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourceLimitInline } from "~/app/derivean/resource/ResourceLimitInline";

const column = withColumn<BuildingResourceSchema["~output"]>();

const columns = [
	column({
		name: "building.baseBuilding.name",
		header() {
			return <Tx label={"Building name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/game/building/$id/resource/list"}
					params={{ locale, id: data.buildingId }}
				>
					{value}
				</LinkTo>
			);
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
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/game/inventory"}
					params={{ locale }}
					search={{
						filter: {
							resourceId: data.resourceId,
						},
					}}
				>
					{value}
				</LinkTo>
			);
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
				hidden: buildingId ? ["building.baseBuilding.name"] : [],
				columns,
			})}
			action={{
				table:
					buildingId ?
						() => {
							const mutation = useResourcePickupMutation();

							return (
								<ActionMenu>
									<ActionClick
										icon={ResourceIcon}
										onClick={() => {
											mutation.mutate({ buildingId });
										}}
									>
										<Tx label={"Pickup resources (label)"} />
									</ActionClick>
								</ActionMenu>
							);
						}
					:	undefined,
				row({ data }) {
					return (
						<ActionMenu>
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
									textContent={
										<Tx label={"Resource item delete user (content)"} />
									}
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
