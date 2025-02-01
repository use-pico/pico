import { createFileRoute } from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/waypoint/$waypointId",
)({
	async loader({
		context: { queryClient, kysely },
		params: { mapId, waypointId },
	}) {
		return {
			waypoint: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "waypoint", waypointId, "fetch"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withFetch({
							select: tx.selectFrom("Waypoint as w").select(["w.id"]),
							output: z.object({
								id: z.string().min(1),
							}),
						});
					});
				},
			}),
		};
	},
});
