import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { PriorityPanel } from "~/app/derivean/game/GameMap2/Route/Priority/PriorityPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/building/$id/route/priority",
)({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return {
			priority: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "building", "route", "priority", id],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Route_Resource as rr")
								.innerJoin("Route as r", "r.id", "rr.routeId")
								.innerJoin("Resource as re", "re.id", "rr.resourceId")
								.innerJoin("Building as bt", "bt.id", "r.toId")
								.innerJoin("Blueprint as blt", "blt.id", "bt.blueprintId")
								.select([
									"rr.id",
									"rr.amount",
									"re.name",
									"rr.priority",
									"blt.name as toName",
								])
								.where("r.fromId", "=", id)
								.orderBy("rr.priority", "desc"),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								toName: z.string().min(1),
								amount: z.number().nonnegative(),
								priority: z.number().int().nonnegative(),
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
		const { priority } = Route.useLoaderData();

		return (
			<PriorityPanel
				building={building}
				priority={priority}
			/>
		);
	},
});
