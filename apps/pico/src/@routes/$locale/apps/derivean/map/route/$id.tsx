import { createFileRoute } from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { Kysely } from "@use-pico/common";
import { RouteSchema } from "~/app/derivean/game/GameMap2/schema/RouteSchema";

export const Route = createFileRoute("/$locale/apps/derivean/map/route/$id")({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return {
			entity: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "route", id],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withFetch({
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
								.where("r.id", "=", id),
							output: RouteSchema,
						});
					});
				},
			}),
		};
	},
});
