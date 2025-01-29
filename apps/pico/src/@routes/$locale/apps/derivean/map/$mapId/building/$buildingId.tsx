import { createFileRoute } from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
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
									"b.constructionId",
									"b.productionId",
									"b.recurringProductionId",
								])
								.where("b.id", "=", buildingId),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								land: z.string().min(1),
								constructionId: z.string().nullish(),
								productionId: z.string().nullish(),
								recurringProductionId: z.string().nullish(),
							}),
						});
					});
				},
			}),
		};
	},
});
