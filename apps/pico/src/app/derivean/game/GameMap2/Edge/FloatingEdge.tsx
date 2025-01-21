import {
    getStraightPath,
    useInternalNode,
    type EdgeProps,
} from "@xyflow/react";
import type { FC } from "react";
import { getEdgeParams } from "~/app/derivean/utils/getEdgeParams";

export namespace FloatingEdge {
	export interface Props extends EdgeProps {
		//
	}
}

export const FloatingEdge: FC<FloatingEdge.Props> = ({
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
			markerEnd={markerEnd}
			style={style}
		/>
	);
};
