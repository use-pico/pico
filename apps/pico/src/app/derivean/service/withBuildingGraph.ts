import Graph from "graphology";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withBuildingGraph {
	export interface Node {
		type: "building" | "waypoint" | "route";
	}

	export interface Edge {
		type: "route" | "building-waypoint";
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
		.innerJoin("Land as l", "l.id", "b.landId")
		.select(["b.id"])
		.where("b.userId", "=", userId)
		.where("l.mapId", "=", mapId)
		.execute();
	const waypoints = await tx
		.selectFrom("Waypoint as w")
		.select("w.id")
		.where("w.mapId", "=", mapId)
		.where("w.userId", "=", userId)
		.execute();

	const buildingWaypoints = await tx
		.selectFrom("Building_Waypoint as bw")
		.select(["bw.buildingId", "bw.waypointId"])
		.where(
			"bw.buildingId",
			"in",
			tx
				.selectFrom("Building as b")
				.innerJoin("Land as l", "l.id", "b.landId")
				.select(["b.id"])
				.where("b.userId", "=", userId)
				.where("l.mapId", "=", mapId),
		)
		.execute();
	const routes = await tx
		.selectFrom("Route as r")
		.select(["r.fromId", "r.toId"])
		.where("r.userId", "=", userId)
		.where("r.mapId", "=", mapId)
		.execute();

	const graph = new Graph<withBuildingGraph.Node, withBuildingGraph.Edge>({
		allowSelfLoops: true,
		multi: false,
		type: "undirected",
	});

	buildings.forEach(({ id }) =>
		graph.addNode(id, {
			type: "building",
		}),
	);
	waypoints.forEach(({ id }) => {
		graph.addNode(id, {
			type: "waypoint",
		});
	});
	buildingWaypoints.forEach(({ buildingId, waypointId }) => {
		graph.addEdge(buildingId, waypointId, {
			type: "building-waypoint",
			weight: 100,
		});
	});
	routes.forEach(({ fromId, toId }) => {
		graph.addEdge(fromId, toId, {
			type: "route",
			weight: 0,
		});
	});

	return { buildings, graph };
};
