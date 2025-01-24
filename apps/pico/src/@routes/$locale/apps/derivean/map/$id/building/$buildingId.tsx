import { createFileRoute } from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$id/building/$buildingId",
)({
	async loader({
		context: { queryClient, kysely },
		params: { id, buildingId },
	}) {
		return {
			building: await queryClient.ensureQueryData({
				queryKey: ["GameMap", id, "building-fetch", buildingId],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withFetch({
							select: tx
								.selectFrom("Building as b")
								.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
								.select([
									"b.id",
									"bl.name",
									"b.productionId",
									"b.recurringProductionId",
								])
								.where("b.id", "=", buildingId),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
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
