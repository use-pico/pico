import { ReactFlowProvider } from "@xyflow/react";
import { type FC } from "react";
import { Content } from "~/app/derivean/game/GameMap2/Content";
import type { RouteEdge } from "~/app/derivean/game/GameMap2/Edge/RouteEdge";
import type { BuildingNode } from "~/app/derivean/game/GameMap2/Node/BuildingNode/BuildingNode";
import type { ConstructionNode } from "~/app/derivean/game/GameMap2/Node/ConstructionNode";
import type { LandNode } from "~/app/derivean/game/GameMap2/Node/LandNode";
import type { QueueNode } from "~/app/derivean/game/GameMap2/Node/QueueNode";

export namespace GameMap2 {
	export interface Props {
		userId: string;
		mapId: string;
		cycle: number;
		construction: ConstructionNode.Data[];
		queue: QueueNode.Data[];
		building: BuildingNode.Data[];
		route: RouteEdge.Data[];
		land: LandNode.Data[];
		zoomToId?: string;
		routing?: boolean;
	}
}

export const GameMap2: FC<GameMap2.Props> = ({
	cycle,
	userId,
	mapId,
	construction,
	building,
	queue,
	route,
    land,
	zoomToId,
	routing,
}) => {
	return (
		<ReactFlowProvider>
			<Content
				userId={userId}
				mapId={mapId}
				cycle={cycle}
				construction={construction}
				queue={queue}
				building={building}
				route={route}
                land={land}
				zoomToId={zoomToId}
				routing={routing}
			/>
		</ReactFlowProvider>
	);
};
