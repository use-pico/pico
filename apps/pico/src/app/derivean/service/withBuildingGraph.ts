import Graph from "graphology";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withBuildingGraph {
	export interface Node {
		type: "building" | "route";
	}

	export interface Edge {
		type: "building-route" | "route-route";
		length: number;
		weight: number;
	}

	export type BuildingGraph = Graph<Node, Edge>;

	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withBuildingGraph = async ({
	tx,
	userId,
	mapId,
}: withBuildingGraph.Props) => {
	const buildings = await tx
		.selectFrom("Building as b")
		.select(["b.id"])
		.innerJoin("Land as l", "l.id", "b.landId")
		.where("b.userId", "=", userId)
		.where("l.mapId", "=", mapId)
		.execute();

	const graph = new Graph<withBuildingGraph.Node, withBuildingGraph.Edge>({
		allowSelfLoops: true,
		multi: false,
		type: "undirected",
	});

	return { buildings, graph };
};
