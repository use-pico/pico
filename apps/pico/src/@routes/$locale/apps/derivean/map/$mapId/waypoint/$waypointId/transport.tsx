import { createFileRoute, useLoaderData } from "@tanstack/react-router";
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
								.innerJoin("Building as b1", "b1.id", "t.sourceId")
								.innerJoin("Building as b2", "b2.id", "t.targetId")
								.innerJoin("Blueprint as bl1", "bl1.id", "b1.blueprintId")
								.innerJoin("Blueprint as bl2", "bl2.id", "b2.blueprintId")
								.select([
									"t.id",
									"t.amount",
									"r.name",
									"t.sourceId",
									"t.targetId",
									"t.progress",
									"bl1.name as source",
									"bl2.name as target",
								])
								.where("t.waypointId", "=", waypointId)
								.orderBy("r.name"),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								source: z.string().min(1),
								sourceId: z.string().min(1),
								target: z.string().min(1),
								targetId: z.string().min(1),
								amount: z.number(),
								progress: z.number(),
							}),
						});
					});
				},
			}),
		};
	},
	component() {
		const { transport } = Route.useLoaderData();
		const { waypoint } = useLoaderData({
			from: "/$locale/apps/derivean/map/$mapId/waypoint/$waypointId",
		});

		return (
			<TransportPanel
				waypoint={waypoint}
				transport={transport}
			/>
		);
	},
});
