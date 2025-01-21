import type { InternalNode } from "@xyflow/react";

export function getNodeIntersection(
	intersectionNode: InternalNode,
	targetNode: InternalNode,
) {
	const { width: intersectionNodeWidth, height: intersectionNodeHeight } =
		intersectionNode.measured;
	const intersectionNodePosition = intersectionNode.internals.positionAbsolute;
	const targetPosition = targetNode.internals.positionAbsolute;

	const w = intersectionNodeWidth! / 2;
	const h = intersectionNodeHeight! / 2;

	const x2 = intersectionNodePosition.x + w;
	const y2 = intersectionNodePosition.y + h;
	const x1 = targetPosition.x + targetNode.measured.width! / 2;
	const y1 = targetPosition.y + targetNode.measured.height! / 2;

	const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
	const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
	const a = 1 / (Math.abs(xx1) + Math.abs(yy1) || 1);
	const xx3 = a * xx1;
	const yy3 = a * yy1;
	const x = w * (xx3 + yy3) + x2;
	const y = h * (-xx3 + yy3) + y2;

	return { x, y };
}
