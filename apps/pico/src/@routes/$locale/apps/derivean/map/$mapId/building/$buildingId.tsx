import { createFileRoute } from "@tanstack/react-router";
import { withFetch, withList } from "@use-pico/client";
import { z } from "zod";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/building/$buildingId",
)({
	async loader({
		context: { queryClient, kysely },
		params: { mapId, buildingId },
	}) {
		return {
			building: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "building", buildingId, "fetch"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withFetch({
							select: tx
								.selectFrom("Building as b")
								.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
								.innerJoin("Land as l", "l.id", "b.landId")
								.innerJoin("Region as r", "r.id", "l.regionId")
								.select([
									"b.id",
									"bl.name",
									"r.name as land",
									"b.productionId",
									"b.recurringProductionId",
								])
								.where("b.id", "=", buildingId),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								land: z.string().min(1),
								productionId: z.string().nullish(),
								recurringProductionId: z.string().nullish(),
							}),
						});
					});
				},
			}),
			related: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "building", buildingId, "related"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.withRecursive("ConnectedWaypoints", (qb) =>
									qb
										.selectFrom("Building_Waypoint as bw")
										.where("bw.buildingId", "=", buildingId)
										.select(["bw.waypointId"])
										.unionAll(
											qb
												.selectFrom("Route as r")
												.innerJoin(
													"ConnectedWaypoints as cw",
													"cw.waypointId",
													"r.fromId",
												)
												.select(["r.toId as waypointId"]),
										),
								)
								.selectFrom("ConnectedWaypoints as cw")
								.innerJoin(
									"Building_Waypoint as bw",
									"bw.waypointId",
									"cw.waypointId",
								)
								.innerJoin("Building as b", "b.id", "bw.buildingId")
								.innerJoin("Land as l", "l.id", "b.landId")
								.where("b.id", "!=", buildingId)
								.where("l.mapId", "=", mapId)
								.select(["b.id as buildingId"])
								.distinct(),
							output: z.object({
								buildingId: z.string().min(1),
							}),
						});
					});
				},
			}),
		};
	},
});
