import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { RoutePanel } from "~/app/derivean/game/GameMap2/Route/RoutePanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/building/$id/routes",
)({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return {
			route: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "building", "routes", id],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Route as r")
								.innerJoin("Building as bf", "bf.id", "r.fromId")
								.innerJoin("Building as bt", "bt.id", "r.toId")
								.innerJoin("Blueprint as blt", "blt.id", "bt.blueprintId")
								.select(["r.id", "r.fromId", "r.toId", "blt.name as toName"])
								.where("r.fromId", "=", id),
							output: z.object({
								id: z.string().min(1),
								fromId: z.string().min(1),
								toId: z.string().min(1),
								toName: z.string().min(1),
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
		const { route } = Route.useLoaderData();

		return (
			<RoutePanel
				building={building}
				route={route}
			/>
		);
	},
});
