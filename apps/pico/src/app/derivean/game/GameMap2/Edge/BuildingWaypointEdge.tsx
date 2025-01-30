import {
    getStraightPath,
    useInternalNode,
    type Edge,
    type EdgeProps,
} from "@xyflow/react";
import type { FC } from "react";
import { getEdgeParams } from "~/app/derivean/utils/getEdgeParams";

export namespace BuildingWaypointEdge {
	export interface Data {
		id: string;
		buildingId: string;
		waypointId: string;
		[key: string]: unknown;
	}

	export type BuildingWaypointEdge = Edge<Data, "building-waypoint">;

	export interface Props extends EdgeProps<BuildingWaypointEdge> {
		//
	}
}

export const BuildingWaypointEdge: FC<BuildingWaypointEdge.Props> = ({
	id,
	source,
	target,
	markerStart,
	markerEnd,
	style,
}) => {
	const sourceNode = useInternalNode(source);
	const targetNode = useInternalNode(target);

	if (!sourceNode || !targetNode) {
		return null;
	}

	const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

	const [edgePath] = getStraightPath({
		sourceX: sx,
		sourceY: sy,
		targetX: tx,
		targetY: ty,
	});

	return (
		<path
			id={id}
			className={"react-flow__edge-path"}
			d={edgePath}
			markerStart={markerStart}
			markerEnd={markerEnd}
			style={style}
		/>
	);
};
