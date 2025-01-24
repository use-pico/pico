import { createFileRoute } from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$id/building/$buildingId/production/$productionId",
)({
	async loader({
		context: { queryClient, kysely },
		params: { id, buildingId, productionId },
	}) {
		return {
			production: await queryClient.ensureQueryData({
				queryKey: [
					"GameMap",
					id,
					"building",
					buildingId,
					"production-fetch",
					productionId,
				],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withFetch({
							select: tx
								.selectFrom("Blueprint_Production as bp")
								.innerJoin("Resource as r", "r.id", "bp.resourceId")
								.select(["bp.id", "bp.amount", "r.name"])
								.where("bp.id", "=", productionId),
							output: z.object({
								id: z.string().min(1),
								amount: z.number().nonnegative(),
								name: z.string().min(1),
							}),
						});
					});
				},
			}),
		};
	},
});
