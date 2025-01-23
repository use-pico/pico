import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { withFloatSchema } from "@use-pico/common";
import { z } from "zod";
import { ConstructionPanel } from "~/app/derivean/game/GameMap2/Route/Construction/ConstructionPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/route/$id/construction",
)({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return {
			resource: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "building", "routes", id, "construction"],
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
			inventory: await queryClient.ensureQueryData({
				queryKey: [
					"GameMap",
					"building",
					"route",
					"inventory",
					id,
					"construction",
				],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Inventory as i")
								.innerJoin("Resource as r", "r.id", "i.resourceId")
								.select(["i.id", "i.resourceId", "r.name", "r.transport"])
								.where(
									"i.id",
									"in",
									tx
										.selectFrom("Building_Inventory as bi")
										.select("bi.inventoryId")
										.where(
											"bi.buildingId",
											"=",
											tx
												.selectFrom("Route as ro")
												.select("ro.toId")
												.where("ro.id", "=", id),
										),
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
												.where("ro.id", "=", id),
										)
										.where("i.type", "in", ["storage", "output"]),
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
												.select("ro.toId")
												.where("ro.id", "=", id),
										)
										.where("i.type", "=", "construction"),
								)
								.where(
									"r.id",
									"not in",
									tx
										.selectFrom("Route_Resource as rr")
										.where("rr.routeId", "=", id)
										.select("rr.resourceId"),
								)
								.orderBy("r.name", "asc"),
							output: z.object({
								id: z.string().min(1),
								resourceId: z.string().min(1),
								name: z.string().min(1),
								transport: withFloatSchema(),
							}),
						});
					});
				},
			}),
		};
	},
	component() {
		const { route } = useLoaderData({
			from: "/$locale/apps/derivean/map/route/$id",
		});
		const { resource, inventory } = Route.useLoaderData();

		return (
			<ConstructionPanel
				route={route}
				resource={resource}
				inventory={inventory}
			/>
		);
	},
});
