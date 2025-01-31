import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { DemandPanel } from "~/app/derivean/game/GameMap2/Building/Demand/DemandPanel";

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
								.innerJoin(
									"Building_Inventory as bi",
									"bi.buildingId",
									"d.buildingId",
								)
								.innerJoin("Inventory as i", (eb) => {
									return eb
										.onRef("i.id", "=", "bi.inventoryId")
										.onRef("i.resourceId", "=", "d.resourceId");
								})
								.innerJoin("Resource as r", "r.id", "d.resourceId")
								.select([
									"d.id",
									"r.name",
									"d.amount",
									"i.limit",
									"i.amount as available",
									(eb) => {
										return eb
											.selectFrom("Transport as t")
											.select((eb) =>
												eb.fn.sum<number>("t.amount").as("transport"),
											)
											.whereRef("t.targetId", "=", "d.buildingId")
											.whereRef("t.resourceId", "=", "d.resourceId")
											.as("transport");
									},
								])
								.where("d.buildingId", "=", buildingId)
								.where("i.type", "=", "storage")
								.orderBy("r.name", "asc"),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								amount: z.number(),
								available: z.number(),
								limit: z.number(),
								transport: z.number().nullish(),
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
