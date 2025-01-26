import { ReactFlowProvider, type Edge, type Node } from "@xyflow/react";
import { type FC } from "react";
import { Content } from "~/app/derivean/game/GameMap2/Content";

export namespace GameMap2 {
	export type NodeType = Node<
		any,
		| "construction"
		| "queue"
		| "building"
		| "building-route"
		| "waypoint"
		| "waypoint-route"
		| "land"
	>;

	export type EdgeType = Edge<any, "route" | "building-waypoint">;

	export interface Props {
		userId: string;
		cycle: number;
		nodes: NodeType[];
		edges: EdgeType[];
		zoomToId?: string;
		routing?: boolean;
	}
}

export const GameMap2: FC<GameMap2.Props> = ({
	cycle,
	userId,
	nodes,
	edges,
	zoomToId,
	routing,
}) => {
	return (
		<ReactFlowProvider>
			<Content
				userId={userId}
				cycle={cycle}
				defaultNodes={nodes}
				defaultEdges={edges}
				zoomToId={zoomToId}
				routing={routing}
			/>
		</ReactFlowProvider>
	);
};
