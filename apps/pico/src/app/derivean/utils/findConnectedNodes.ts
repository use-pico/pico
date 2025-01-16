export namespace findConnectedNodes {
	export interface Props {
		startNodeId: string;
		edges: any[];
	}
}

export const findConnectedNodes = ({
	startNodeId,
	edges,
}: findConnectedNodes.Props) => {
	const visitedNodes = new Set<string>();
	const visitedEdges = new Set<string>();
	const queue: string[] = [startNodeId];

	while (queue.length > 0) {
		const currentNode = queue.shift();
		if (currentNode && !visitedNodes.has(currentNode)) {
			visitedNodes.add(currentNode);

			edges.forEach((edge) => {
				if (edge.source === currentNode) {
					visitedEdges.add(edge.id);
					queue.push(edge.target);
				}
			});
		}
	}

	return {
		nodes: Array.from(visitedNodes),
		edges: Array.from(visitedEdges),
	};
};
