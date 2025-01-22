import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { ResourcePanel } from "~/app/derivean/game/GameMap2/Route/Resource/ResourcePanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/route/$id/resources",
)({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return {
			resource: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "route", "resources", id],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Route_Resource as rr")
								.innerJoin("Resource as r", "r.id", "rr.resourceId")
								.select([
									"rr.id",
									"r.name",
									"rr.amount",
									"rr.routeId",
									"rr.resourceId",
								])
								.where("rr.routeId", "=", id),
							output: z.object({
								id: z.string().min(1),
								routeId: z.string().min(1),
								resourceId: z.string().min(1),
								name: z.string().min(1),
								amount: z.number().nonnegative(),
							}),
						});
					});
				},
			}),
		};
	},
	component() {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/map/route/$id",
		});
		const { resource } = Route.useLoaderData();

		return (
			<ResourcePanel
				entity={entity}
				resource={resource}
				inventory={[]}
			/>
		);
	},
});
