import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BuildingPanel } from "~/app/derivean/game/GameMap2/Building/BuildingPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/building/$buildingId/view",
)({
	async loader({
		context: { queryClient, kysely },
		params: { mapId, buildingId },
	}) {
		/**
		 * Find related buildings through waypoints.
		 */
		kysely.transaction().execute(async (tx) => {
			const query = await tx
				.withRecursive("ConnectedWaypoints", (qb) =>
					qb
						.selectFrom("Building_Waypoint as BW")
						.where("BW.buildingId", "=", buildingId)
						.select(["BW.waypointId"])
						.unionAll(
							qb
								.selectFrom("Route as R")
								.innerJoin(
									"ConnectedWaypoints as CW",
									"CW.waypointId",
									"R.fromId",
								)
								.select(["R.toId as waypointId"]),
						),
				)
				.selectFrom("ConnectedWaypoints as CW")
				.innerJoin("Building_Waypoint as BW", "BW.waypointId", "CW.waypointId")
				.innerJoin("Building as B", "B.id", "BW.buildingId")
				.innerJoin("Land as l", "l.id", "B.landId")
				.where("B.id", "!=", buildingId)
				.where("l.mapId", "=", mapId)
				.select(["B.id as buildingId"])
				.distinct()
				.execute();

			console.log("bo", query);
		});
	},
	component() {
		const { building } = useLoaderData({
			from: "/$locale/apps/derivean/map/$mapId/building/$buildingId",
		});

		return <BuildingPanel building={building} />;
	},
});
