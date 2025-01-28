import { useMutation } from "@tanstack/react-query";
import { Button, Icon, TrashIcon, useInvalidator } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import {
    Handle,
    NodeToolbar,
    Position,
    type Node,
    type NodeProps,
} from "@xyflow/react";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { ToolbarCss } from "~/app/derivean/game/GameMap2/Node/ToolbarCss";
import { WaypointIcon } from "~/app/derivean/icon/WaypointIcon";
import { withBuildingRouteBuilding } from "~/app/derivean/service/withBuildingRouteBuilding";

export namespace WaypointNode {
	export interface Data {
		id: string;
		x: number;
		y: number;
		userId: string;
		mapId: string;
		[key: string]: unknown;
	}

	export type WaypointNode = Node<Data, "waypoint">;

	export interface Props extends NodeProps<WaypointNode> {
		//
	}
}

export const WaypointNode: FC<WaypointNode.Props> = ({
	id,
	data: { mapId, userId },
}) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const deleteWaypointMutation = useMutation({
		async mutationFn({
			id,
			userId,
			mapId,
		}: {
			id: string;
			userId: string;
			mapId: string;
		}) {
			return kysely.transaction().execute(async (tx) => {
				await tx.deleteFrom("Waypoint").where("id", "=", id).execute();

				setTimeout(async () => {
					await withBuildingRouteBuilding({
						tx,
						mapId,
						userId,
					});
					await invalidator();
				}, 0);
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	return (
		<>
			<NodeToolbar className={tvc(ToolbarCss)}>
				<div
					className={"flex flex-row gap-2 items-center justify-between w-full"}
				>
					<Button
						iconEnabled={TrashIcon}
						variant={{ variant: "danger" }}
						loading={deleteWaypointMutation.isPending}
						onClick={() => {
							deleteWaypointMutation.mutate({ id, mapId, userId });
						}}
					/>
				</div>
			</NodeToolbar>
			<div className="w-full h-full flex items-center justify-center">
				<Icon
					icon={WaypointIcon}
					variant={{ size: "5xl" }}
				/>

				<Handle
					className={"hidden"}
					position={Position.Right}
					type={"source"}
					isConnectable={false}
				/>
				<Handle
					className={"hidden"}
					position={Position.Left}
					type={"target"}
					isConnectable={false}
				/>
			</div>
		</>
	);
};
