import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { SupplyPanel } from "~/app/derivean/game/GameMap2/Supply/SupplyPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/building/$buildingId/supply",
)({
	async loader({
		context: { queryClient, kysely },
		params: { mapId, buildingId },
	}) {
		return {
			supply: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "building", buildingId, "supply", "list"],
				queryFn: async () => {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Supply as s")
								.innerJoin("Resource as r", "r.id", "s.resourceId")
								.select(["s.id", "r.name"])
								.where("s.buildingId", "=", buildingId)
								.orderBy("r.name", "asc"),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
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
		const { supply } = Route.useLoaderData();

		return (
			<SupplyPanel
				building={building}
				supply={supply}
			/>
		);
	},
});
