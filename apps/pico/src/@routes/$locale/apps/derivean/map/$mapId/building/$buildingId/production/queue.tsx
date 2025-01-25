import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { QueuePanel } from "~/app/derivean/game/GameMap2/Production/Queue/QueuePanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/building/$buildingId/production/queue",
)({
	async loader({
		context: { queryClient, kysely },
		params: { mapId, buildingId },
	}) {
		return {
			queue: await queryClient.ensureQueryData({
				queryKey: [
					"GameMap",
					mapId,
					"building",
					buildingId,
					"production",
					"queue",
				],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Production as p")
								.innerJoin(
									"Blueprint_Production as bp",
									"bp.id",
									"p.blueprintProductionId",
								)
								.innerJoin("Resource as r", "r.id", "bp.resourceId")
								.select([
									"p.id",
									"r.name",
									"bp.resourceId",
									"p.cycle",
									"bp.amount",
									"bp.cycles",
								])
								.where("p.buildingId", "=", buildingId),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								resourceId: z.string().min(1),
								amount: z.number().nonnegative(),
								cycle: z.number().int().nonnegative(),
								cycles: z.number().int().nonnegative(),
							}),
						});
					});
				},
			}),
			inventory: await queryClient.ensureQueryData({
				queryKey: [
					"GameMap",
					mapId,
					"building",
					buildingId,
					"inventory",
					"list",
				],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Inventory as i")
								.innerJoin("Resource as r", "r.id", "i.resourceId")
								.select([
									"i.id",
									"i.resourceId",
									"i.amount",
									"i.limit",
									"r.name",
								])
								.where(
									"i.id",
									"in",
									tx
										.selectFrom("Building_Inventory as bi")
										.select("bi.inventoryId")
										.where("bi.buildingId", "=", buildingId),
								)
								.orderBy("r.name"),
							query({ select, where }) {
								let $select = select;

								if (where?.fulltext) {
									const fulltext = `%${where.fulltext}%`.toLowerCase();

									$select = $select.where((eb) => {
										return eb.or([eb("r.name", "like", fulltext)]);
									});
								}

								return $select;
							},
							output: z.object({
								id: z.string().min(1),
								resourceId: z.string().min(1),
								amount: z.number().nonnegative(),
								limit: z.number().nonnegative(),
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
		const { queue, inventory } = Route.useLoaderData();

		return (
			<QueuePanel
				building={building}
				queue={queue}
				inventory={inventory}
			/>
		);
	},
});
