import { bidirectional } from "graphology-shortest-path/unweighted";
import { dfsFromNode } from "graphology-traversal/dfs";
import type { withBuildingGraph } from "~/app/derivean/service/withBuildingGraph";

export namespace withPathOf {
	export interface Building {
		id: string;
	}

	export interface Props {
		graph: withBuildingGraph.BuildingGraph;
		buildings: Building[];
	}
}

export const withPathOf = ({ graph, buildings }: withPathOf.Props) => {
	const related = new Map<string, { buildingId: string; linkId: string }>();
	for (const { id } of buildings) {
		dfsFromNode(graph, id, (node, attr, depth) => {
			if (attr.type === "building" && id !== node) {
				related.set(`${id}-${node}`, { buildingId: id, linkId: node });
			}

			return depth >= 50;
		});
	}

	return [...related.values()].filter(({ buildingId, linkId }) => {
		const path = bidirectional(graph, buildingId, linkId);
		if (!path) {
			return false;
		}
		/**
		 * Omit buildings from both sides.
		 */
		const route = path.slice(1, -1);
		/**
		 * Buildings can be connected only by buildings.
		 */
		return route.every((node) => {
			return graph.getNodeAttribute(node, "type") === "waypoint";
		});
	});
};
