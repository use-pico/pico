import dijkstra from "graphology-shortest-path/dijkstra";
import type { withBuildingGraph } from "~/app/derivean/service/withBuildingGraph";

export namespace withShortestPath {
	export interface Props {
		graph: withBuildingGraph.BuildingGraph;
		from: string;
		to: string;
		mode: "full" | "road";
	}
}

export const withShortestPath = ({
	graph,
	from,
	to,
	mode,
}: withShortestPath.Props) => {
	const path = dijkstra.bidirectional(graph, from, to, "weight");

	if (!path) {
		return undefined;
	}

	switch (mode) {
		case "full": {
			return path;
		}

		case "road": {
			/**
			 * TODO Check if start/end nodes are buildings.
			 */

			/**
			 * Omit buildings from both sides.
			 */
			const route = path.slice(1, -1);
			/**
			 * Buildings can be connected only by buildings.
			 */
			return (
					route.every((node) => {
						return graph.getNodeAttribute(node, "type") === "route";
					})
				) ?
					path
				:	undefined;
		}
	}
};
