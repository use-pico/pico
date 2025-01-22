import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { QueuePanel } from "~/app/derivean/game/GameMap2/Production/Queue/QueuePanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/building/$id/production/queue",
)({
	async loader({ context: { queryClient, kysely, session }, params: { id } }) {
		const user = await session();

		return {
			user,
			queue: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "building", "production", "queue", id],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Production_Queue as pq")
								.innerJoin(
									"Blueprint_Production as bp",
									"bp.id",
									"pq.blueprintProductionId",
								)
								.innerJoin("Resource as r", "r.id", "bp.resourceId")
								.select([
									"pq.id",
									"r.name",
									"bp.amount",
									"bp.cycles",
									"pq.limit",
								])
								.where(
									"bp.blueprintId",
									"=",
									tx
										.selectFrom("Building as b")
										.select("b.blueprintId")
										.where("b.id", "=", id),
								)
								.orderBy("pq.priority", "asc"),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								amount: z.number().nonnegative(),
								cycles: z.number().int().nonnegative(),
								limit: z.number().int().nonnegative(),
							}),
						});
					});
				},
			}),
		};
	},
	component() {
		const { building } = useLoaderData({
			from: "/$locale/apps/derivean/map/building/$id",
		});
		const { user, queue } = Route.useLoaderData();

		return (
			<QueuePanel
				building={building}
				queue={queue}
			/>
		);
	},
});
