import type { QueryClient } from "@tanstack/react-query";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";

export namespace withWaypointInventoryLoader {
	export interface Props {
		queryClient: QueryClient;
		buildingId: string;
		mapId: string;
	}
}

export const withWaypointInventoryLoader = async ({
	queryClient,
	buildingId,
	mapId,
}: withWaypointInventoryLoader.Props) => {
	return queryClient.ensureQueryData({
		queryKey: ["GameMap", mapId, "building", buildingId, "waypointInventory"],
		async queryFn() {
			return kysely.transaction().execute(async (tx) => {
				return withList({
					select: tx
						.selectFrom("Inventory as i")
						.innerJoin("Resource as r", "r.id", "i.resourceId")
						.select(["i.id", "r.name"])
						.where(
							"i.id",
							"in",
							tx
								.selectFrom("Building_Inventory as bi")
								.select("bi.inventoryId")
								.where(
									"bi.buildingId",
									"in",
									tx
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
								),
						)
						.orderBy("r.name", "asc"),
					output: z.object({
						id: z.string().min(1),
						name: z.string().min(1),
					}),
				});
			});
		},
	});
};
