import { ReactFlowProvider } from "@xyflow/react";
import { type FC } from "react";
import { Content } from "~/app/derivean/game/GameMap2/Content";
import type { BuildingWaypointEdge } from "~/app/derivean/game/GameMap2/Edge/BuildingWaypointEdge";
import type { RouteEdge } from "~/app/derivean/game/GameMap2/Edge/RouteEdge";
import type { BuildingNode } from "~/app/derivean/game/GameMap2/Node/BuildingNode/BuildingNode";
import type { ConstructionNode } from "~/app/derivean/game/GameMap2/Node/ConstructionNode";
import type { LandNode } from "~/app/derivean/game/GameMap2/Node/LandNode";
import type { QueueNode } from "~/app/derivean/game/GameMap2/Node/QueueNode";
import type { WaypointNode } from "~/app/derivean/game/GameMap2/Node/WaypointNode/WaypointNode";

export namespace GameMap2 {
	export interface Props {
		userId: string;
		cycle: number;
		construction: ConstructionNode.Data[];
		queue: QueueNode.Data[];
		building: BuildingNode.Data[];
		waypoint: WaypointNode.Data[];
		route: RouteEdge.Data[];
		buildingWaypoint: BuildingWaypointEdge.Data[];
		land: LandNode.Data[];
		zoomToId?: string;
		routing?: boolean;
	}
}

export const GameMap2: FC<GameMap2.Props> = ({
	cycle,
	userId,
	construction,
	building,
	waypoint,
	queue,
	route,
    buildingWaypoint,
	land,
	zoomToId,
	routing,
}) => {
	return (
		<ReactFlowProvider>
			<Content
				userId={userId}
				cycle={cycle}
				construction={construction}
				queue={queue}
				building={building}
				waypoint={waypoint}
				route={route}
                buildingWaypoint={buildingWaypoint}
				land={land}
				zoomToId={zoomToId}
				routing={routing}
			/>
		</ReactFlowProvider>
	);
};
