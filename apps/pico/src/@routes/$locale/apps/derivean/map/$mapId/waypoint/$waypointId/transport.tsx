import { createFileRoute } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { TransportPanel } from "~/app/derivean/game/GameMap2/Waypoint/Transport/TransportPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/waypoint/$waypointId/transport",
)({
	async loader({
		context: { queryClient, kysely },
		params: { mapId, waypointId },
	}) {
		return {
			transport: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "waypoint", waypointId, "transport"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Transport as t")
								.innerJoin("Resource as r", "r.id", "t.resourceId")
								.select(["t.id", "t.amount", "r.name"])
								.where("t.waypointId", "=", waypointId)
								.orderBy("r.name"),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								amount: z.number(),
							}),
						});
					});
				},
			}),
		};
	},
	component() {
		const { transport } = Route.useLoaderData();

		return <TransportPanel transport={transport} />;
	},
});
