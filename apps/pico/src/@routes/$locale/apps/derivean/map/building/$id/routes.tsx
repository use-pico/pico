import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { Kysely, withJsonArraySchema } from "@use-pico/common";
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
								.innerJoin("Blueprint as blf", "blf.id", "bf.blueprintId")
								.innerJoin("Building as bt", "bt.id", "r.toId")
								.innerJoin("Blueprint as blt", "blt.id", "bt.blueprintId")
								.select([
									"r.id",
									"r.fromId",
									"r.toId",
									"blf.name as fromName",
									"blt.name as toName",
									(eb) => {
										return eb
											.selectFrom("Building_Inventory as bi")
											.innerJoin("Inventory as i", "i.id", "bi.inventoryId")
											.innerJoin("Resource as r", "r.id", "i.resourceId")
											.where("bi.buildingId", "=", "r.buildingId")
											.select((eb) => {
												return Kysely.jsonGroupArray({
													id: eb.ref("bi.id"),
													amount: eb.ref("i.amount"),
													limit: eb.ref("i.limit"),
													name: eb.ref("r.name"),
												}).as("inventory");
											})
											.as("inventory");
									},
								])
								.where("r.fromId", "=", id),
							output: z.object({
								id: z.string().min(1),
								fromId: z.string().min(1),
								toId: z.string().min(1),
								fromName: z.string().min(1),
								toName: z.string().min(1),
								inventory: withJsonArraySchema(z.any()),
							}),
						});
					});
				},
			}),
		};
	},
	component() {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/map/building/$id",
		});
		const { route } = Route.useLoaderData();

		return <RoutePanel entity={entity} />;
	},
});
