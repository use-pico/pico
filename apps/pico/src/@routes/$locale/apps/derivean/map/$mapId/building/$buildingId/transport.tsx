import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { TransportPanel } from "~/app/derivean/game/GameMap2/Building/Transport/TransportPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/building/$buildingId/transport",
)({
	async loader({
		context: { queryClient, kysely },
		params: { mapId, buildingId },
	}) {
		return {
			transport: await queryClient.ensureQueryData({
				queryKey: [
					"GameMap",
					mapId,
					"building",
					buildingId,
					"transport",
					"list",
				],
				queryFn: async () => {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Transport as t")
								.innerJoin("Building as source", "source.id", "t.sourceId")
								.innerJoin("Blueprint as bl", "bl.id", "source.blueprintId")
								.innerJoin("Resource as r", "r.id", "t.resourceId")
								.select([
									"t.id",
									"r.name as resource",
									"source.id as sourceId",
									"bl.name as source",
									"t.amount",
								])
								.where("t.targetId", "=", buildingId)
								.orderBy("r.name", "asc"),
							output: z.object({
								id: z.string().min(1),
								resource: z.string().min(1),
								source: z.string().min(1),
								sourceId: z.string().min(1),
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
		const { transport } = Route.useLoaderData();

		return (
			<TransportPanel
				building={building}
				transport={transport}
			/>
		);
	},
});
