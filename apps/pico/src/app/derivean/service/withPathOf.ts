import { dfsFromNode } from "graphology-traversal/dfs";
import type { withBuildingGraph } from "~/app/derivean/service/withBuildingGraph";
import { withShortestPath } from "~/app/derivean/service/withShortestPath";

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
		const path = withShortestPath({
			mode: "waypoint",
			graph,
			from: buildingId,
			to: linkId,
		});

		if (!path) {
			return false;
		}

		return true;
	});
};
