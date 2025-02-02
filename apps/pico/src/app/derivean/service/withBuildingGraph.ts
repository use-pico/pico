import Graph from "graphology";
import { sql } from "kysely";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withBuildingGraph {
	export interface Node {
		type: "building" | "waypoint" | "route";
		x: number;
		y: number;
	}

	export interface Edge {
		type: "route" | "building-waypoint";
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
		.innerJoin("Land as l", "l.id", "b.landId")
		.select([
			"b.id",
			(eb) => sql<number>`${eb.ref("b.x")} + ${eb.ref("l.x")}`.as("x"),
			(eb) => sql<number>`${eb.ref("b.y")} + ${eb.ref("l.y")}`.as("y"),
		])
		.where("b.userId", "=", userId)
		.where("l.mapId", "=", mapId)
		.execute();
	const waypoints = await tx
		.selectFrom("Waypoint as w")
		.select(["w.id", "w.x", "w.y"])
		.where("w.mapId", "=", mapId)
		.where("w.userId", "=", userId)
		.execute();

	const buildingWaypoints = await tx
		.selectFrom("Building_Waypoint as bw")
		.innerJoin("Building as b", "b.id", "bw.buildingId")
		.innerJoin("Land as l", "l.id", "b.landId")
		.innerJoin("Waypoint as w", "w.id", "bw.waypointId")
		.select([
			"bw.id",
			"bw.buildingId",
			"bw.waypointId",
			(eb) => sql<number>`${eb.ref("b.x")} + ${eb.ref("l.x")}`.as("buildingX"),
			(eb) => sql<number>`${eb.ref("b.y")} + ${eb.ref("l.y")}`.as("buildingY"),
			"w.x as waypointX",
			"w.y as waypointY",
		])
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
		.innerJoin("Waypoint as from", "from.id", "r.fromId")
		.innerJoin("Waypoint as to", "to.id", "r.toId")
		.select([
			"r.id",
			"r.fromId",
			"r.toId",
			"from.x as fromX",
			"from.y as fromY",
			"to.x as toX",
			"to.y as toY",
		])
		.where("r.userId", "=", userId)
		.where("r.mapId", "=", mapId)
		.execute();

	const graph = new Graph<withBuildingGraph.Node, withBuildingGraph.Edge>({
		allowSelfLoops: true,
		multi: false,
		type: "undirected",
	});

	buildings.forEach(({ id, x, y }) =>
		graph.addNode(id, {
			type: "building",
			x,
			y,
		}),
	);
	waypoints.forEach(({ id, x, y }) => {
		graph.addNode(id, {
			type: "waypoint",
			x,
			y,
		});
	});
	buildingWaypoints.forEach(
		({
			id,
			buildingId,
			waypointId,
			buildingX,
			buildingY,
			waypointX,
			waypointY,
		}) => {
			const length = Math.sqrt(
				(waypointX - buildingX) ** 2 + (waypointY - buildingY) ** 2,
			);

			graph.addEdgeWithKey(id, buildingId, waypointId, {
				type: "building-waypoint",
				length,
				weight: length * 100,
			});
		},
	);
	routes.forEach(({ id, fromId, toId, fromX, fromY, toX, toY }) => {
		const length = Math.sqrt((toX - fromX) ** 2 + (toY - fromY) ** 2);

		graph.addEdgeWithKey(id, fromId, toId, {
			type: "route",
			length,
			/**
			 * Lower values has higher priority
			 */
			weight: length,
		});
	});

	return { buildings, graph };
};
