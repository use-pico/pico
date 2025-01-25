import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { withFloatSchema } from "@use-pico/common";
import { z } from "zod";
import { ResourcePanel } from "~/app/derivean/game/GameMap2/Route/Resource/ResourcePanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/route/$routeId/resources",
)({
	async loader({
		context: { queryClient, kysely },
		params: { mapId, routeId },
	}) {
		return {
			resource: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "route", routeId, "resources", "list"],
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
									"rr.type",
								])
								.where("rr.routeId", "=", routeId)
								.orderBy("r.name", "asc"),
							output: z.object({
								id: z.string().min(1),
								routeId: z.string().min(1),
								resourceId: z.string().min(1),
								name: z.string().min(1),
								amount: z.number().nonnegative(),
								type: z.enum(["storage", "construction", "input", "output"]),
							}),
						});
					});
				},
			}),
			inventory: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "route", routeId, "inventory", "list"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Inventory as i")
								.innerJoin("Resource as r", "r.id", "i.resourceId")
								.select([
									"i.id",
									"i.resourceId",
									"r.name",
									"r.transport",
									"i.type",
								])
								.where(
									"i.id",
									"in",
									tx
										.selectFrom("Building_Inventory as bi")
										.innerJoin("Inventory as i", "i.id", "bi.inventoryId")
										.select("bi.inventoryId")
										.where(
											"bi.buildingId",
											"=",
											tx
												.selectFrom("Route as ro")
												.select("ro.toId")
												.where("ro.id", "=", routeId),
										)
										.where("i.type", "in", ["storage"]),
								)
								.where(
									"r.id",
									"in",
									tx
										.selectFrom("Building_Inventory as bi")
										.innerJoin("Inventory as i", "i.id", "bi.inventoryId")
										.select("i.resourceId")
										.where(
											"bi.buildingId",
											"=",
											tx
												.selectFrom("Route as ro")
												.select("ro.fromId")
												.where("ro.id", "=", routeId),
										)
										.where("i.type", "in", ["storage"]),
								)
								.where(
									"r.id",
									"not in",
									tx
										.selectFrom("Route_Resource as rr")
										.where("rr.routeId", "=", routeId)
										.select("rr.resourceId"),
								)
								.orderBy("r.name", "asc"),
							output: z.object({
								id: z.string().min(1),
								resourceId: z.string().min(1),
								name: z.string().min(1),
								transport: withFloatSchema(),
								type: z.string().min(1),
							}),
						});
					});
				},
			}),
		};
	},
	component() {
		const { route } = useLoaderData({
			from: "/$locale/apps/derivean/map/$mapId/route/$routeId",
		});
		const { resource, inventory } = Route.useLoaderData();

		return (
			<ResourcePanel
				route={route}
				resource={resource}
				inventory={inventory}
			/>
		);
	},
});