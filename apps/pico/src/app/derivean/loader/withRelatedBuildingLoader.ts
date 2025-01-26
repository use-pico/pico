import type { QueryClient } from "@tanstack/react-query";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";

export namespace withRelatedBuildingLoader {
	export interface Props {
		queryClient: QueryClient;
		buildingId: string;
		mapId: string;
	}
}

export const withRelatedBuildingLoader = async ({
	buildingId,
	mapId,
	queryClient,
}: withRelatedBuildingLoader.Props) => {
	return queryClient.ensureQueryData({
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
	});
};
