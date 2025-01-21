import type { InternalNode } from "@xyflow/react";
import { getEdgePosition } from "~/app/derivean/utils/getEdgePosition";
import { getNodeIntersection } from "~/app/derivean/utils/getNodeIntersection";

export function getEdgeParams(source: InternalNode, target: InternalNode) {
	const sourceIntersectionPoint = getNodeIntersection(source, target);
	const targetIntersectionPoint = getNodeIntersection(target, source);

	const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
	const targetPos = getEdgePosition(target, targetIntersectionPoint);

	return {
		sx: sourceIntersectionPoint.x,
		sy: sourceIntersectionPoint.y,
		tx: targetIntersectionPoint.x,
		ty: targetIntersectionPoint.y,
		sourcePos,
		targetPos,
	};
}
