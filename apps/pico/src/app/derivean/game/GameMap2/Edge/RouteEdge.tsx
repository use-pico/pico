import {
    getSimpleBezierPath,
    useInternalNode,
    type Edge,
    type EdgeProps,
} from "@xyflow/react";
import type { FC } from "react";
import { getEdgeParams } from "~/app/derivean/utils/getEdgeParams";

export namespace RouteEdge {
	export interface Data {
		id: string;
		fromId: string;
		toId: string;
		[key: string]: unknown;
	}

	export interface Props extends EdgeProps<Edge<Data, "route">> {
		//
	}
}

export const RouteEdge: FC<RouteEdge.Props> = ({
	id,
	source,
	target,
	markerEnd,
	style,
}) => {
	const sourceNode = useInternalNode(source);
	const targetNode = useInternalNode(target);

	if (!sourceNode || !targetNode) {
		return null;
	}

	const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

	const [edgePath] = getSimpleBezierPath({
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
			markerEnd={markerEnd}
			style={style}
		/>
	);
};
