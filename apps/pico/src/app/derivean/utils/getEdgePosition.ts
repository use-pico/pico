import { Position, type InternalNode } from "@xyflow/react";

export function getEdgePosition(
	node: InternalNode,
	intersectionPoint: { x: number; y: number },
) {
	const n = { ...node.internals.positionAbsolute, ...node };
	const nx = Math.round(n.x);
	const ny = Math.round(n.y);
	const px = Math.round(intersectionPoint.x);
	const py = Math.round(intersectionPoint.y);

	if (px <= nx + 1) {
		return Position.Left;
	}
	if (px >= nx + n.measured.width! - 1) {
		return Position.Right;
	}
	if (py <= ny + 1) {
		return Position.Top;
	}
	if (py >= n.y + n.measured.height! - 1) {
		return Position.Bottom;
	}

	return Position.Top;
}
