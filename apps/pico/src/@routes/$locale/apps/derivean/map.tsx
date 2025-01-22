import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { ls, withList } from "@use-pico/client";
import { Kysely, withBoolSchema } from "@use-pico/common";
import { z } from "zod";
import { GameMap2 } from "~/app/derivean/game/GameMap2/GameMap2";
import { SessionSchema } from "~/app/derivean/schema/SessionSchema";

export const Route = createFileRoute("/$locale/apps/derivean/map")({
	validateSearch: zodValidator(
		z.object({
			zoomToId: z.string().optional(),
			routing: z.boolean().optional(),
		}),
	),
	async beforeLoad({ context, params: { locale } }) {
		return {
			...context,
			async session() {
				try {
					return SessionSchema.parse(ls.get("session"));
				} catch (_) {
					throw redirect({
						to: `/$locale/apps/derivean/public/login`,
						params: { locale },
					});
				}
			},
		};
	},
	async loader({ context: { queryClient, kysely, session } }) {
		const user = await session();

		return {
			user,
			construction: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "construction", user.id],
				async queryFn() {
					return kysely.transaction().execute((tx) => {
						return withList({
							select: tx
								.selectFrom("Construction as c")
								.innerJoin("Blueprint as bl", "bl.id", "c.blueprintId")
								.select([
									"c.id",
									"c.blueprintId",
									"bl.name",
									"c.x",
									"c.y",
									"c.valid",
								])
								.where("c.plan", "=", true)
								.where("c.userId", "=", user.id),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								x: z.number(),
								y: z.number(),
								valid: withBoolSchema(),
							}),
						});
					});
				},
			}),
			queue: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "queue", user.id],
				async queryFn() {
					return kysely.transaction().execute((tx) => {
						return withList({
							select: tx
								.selectFrom("Construction as c")
								.innerJoin("Blueprint as bl", "bl.id", "c.blueprintId")
								.select([
									"c.id",
									"c.blueprintId",
									"bl.name",
									"c.x",
									"c.y",
									"c.valid",
									"c.from",
									"c.to",
									"c.cycle",
								])
								.where("c.plan", "=", false)
								.where("c.userId", "=", user.id),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								x: z.number(),
								y: z.number(),
								from: z.number().int().nonnegative(),
								to: z.number().int().nonnegative(),
								cycle: z.number().int().nonnegative(),
							}),
						});
					});
				},
			}),
			building: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "building", user.id],
				async queryFn() {
					return kysely.transaction().execute((tx) => {
						return withList({
							select: tx
								.selectFrom("Building as bg")
								.innerJoin("Blueprint as bl", "bl.id", "bg.blueprintId")
								.select(["bg.id", "bg.blueprintId", "bl.name", "bg.x", "bg.y"])
								.where("bg.userId", "=", user.id),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								x: z.number(),
								y: z.number(),
							}),
						});
					});
				},
			}),
			route: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "route", user.id],
				async queryFn() {
					return kysely.transaction().execute((tx) => {
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
								.where("r.userId", "=", user.id),
							output: z.object({
								id: z.string().min(1),
								fromId: z.string().min(1),
								toId: z.string().min(1),
								fromName: z.string().min(1),
								toName: z.string().min(1),
							}),
						});
					});
				},
			}),
			cycle: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "Cycle"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return (
							await tx
								.selectFrom("Cycle as c")
								.select((eb) => eb.fn.count<number>("c.id").as("count"))
								.where("c.userId", "=", user.id)
								.executeTakeFirstOrThrow()
						).count;
					});
				},
			}),
		};
	},
	component() {
		const { user, construction, queue, building, route, cycle } =
			Route.useLoaderData();
		const { zoomToId, routing } = Route.useSearch();

		return (
			<GameMap2
				userId={user.id}
				cycle={cycle}
				construction={construction}
				queue={queue}
				building={building}
				route={route}
				zoomToId={zoomToId}
				routing={routing}
			/>
		);
	},
});
