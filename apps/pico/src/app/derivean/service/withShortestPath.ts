import dijkstra from "graphology-shortest-path/dijkstra";
import type { withBuildingGraph } from "~/app/derivean/service/withBuildingGraph";

export namespace withShortestPath {
	export interface Props {
		graph: withBuildingGraph.BuildingGraph;
		from: string;
		to: string;
		mode: "path" | "route";
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
		return false;
	}

	switch (mode) {
		case "path": {
			return path;
		}

		case "route": {
			/**
			 * Omit buildings from both sides.
			 */
			const route = path.slice(1, -1);
			/**
			 * Buildings can be connected only by buildings.
			 */
			return (
					route.every((node) => {
						return graph.getNodeAttribute(node, "type") === "waypoint";
					})
				) ?
					path
				:	undefined;
		}
	}
};
