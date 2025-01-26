import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { DemandPanel } from "~/app/derivean/game/GameMap2/Demand/DemandPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/building/$buildingId/demand",
)({
	async loader({
		context: { queryClient, kysely },
		params: { mapId, buildingId },
	}) {
		return {
			demand: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "building", buildingId, "demand", "list"],
				queryFn: async () => {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Demand as d")
								.innerJoin("Resource as r", "r.id", "d.resourceId")
								.select(["d.id", "r.name", "d.amount"])
								.where("d.buildingId", "=", buildingId)
								.orderBy("r.name", "asc"),
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
		const { building } = useLoaderData({
			from: "/$locale/apps/derivean/map/$mapId/building/$buildingId",
		});
		const { demand } = Route.useLoaderData();

		return (
			<DemandPanel
				building={building}
				demand={demand}
			/>
		);
	},
});
