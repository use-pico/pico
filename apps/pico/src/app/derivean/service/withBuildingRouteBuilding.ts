import { genId, Timer } from "@use-pico/common";
import Graph from "graphology";
import { dfsFromNode } from "graphology-traversal/dfs";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withBuildingRouteBuilding {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withBuildingRouteBuilding = async ({
	tx,
	userId,
	mapId,
}: withBuildingRouteBuilding.Props) => {
	const timer = new Timer({ label: "pathfinder" });
	timer.start();

	console.info("Staring pathfinding...");
	const queryTimer = new Timer({
		label: "query",
	});

	queryTimer.start();

	await tx
		.deleteFrom("Building_Route_Building as brb")
		.where("brb.userId", "=", userId)
		.execute();

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
		.execute();

	console.info(`-- Queries [${queryTimer.stop().ms()} ms]`);

	const graphTimer = new Timer({
		label: "graph",
	});

	graphTimer.start();
	const graph = new Graph<
		{
			type: "building" | "waypoint" | "route";
		},
		{
			type: "route" | "waypoint";
		}
	>({
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
			type: "waypoint",
		});
	});
	routes.forEach(({ fromId, toId }) => {
		graph.addEdge(fromId, toId, {
			type: "route",
		});
	});

	console.info(`-- Graph [${graphTimer.stop().ms()} ms]`);

	const relatedTimer = new Timer({
		label: "related",
	});

	relatedTimer.start();
	const related = new Map<string, { buildingId: string; linkId: string }>();
	for (const { id } of buildings) {
		dfsFromNode(graph, id, (node, attr, depth) => {
			if (attr.type === "building") {
				related.set(`${id}-${node}`, { buildingId: id, linkId: node });
			}

			return depth >= 50;
		});
	}

	console.info(`-- Related search [${relatedTimer.stop().ms()} ms]`);

	const insertTimer = new Timer({
		label: "insert",
	});
	insertTimer.start();
	await tx
		.insertInto("Building_Route_Building")
		.values(
			[...related.values()].map((item) => ({
				id: genId(),
				mapId,
				userId,
				...item,
			})),
		)
		.execute();

	console.info(`-- Insert in [${insertTimer.stop().ms()} ms]`);

	console.info(`Done [${timer.stop().ms()} ms]`);
};
