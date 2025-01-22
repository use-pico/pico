import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { ls, withList } from "@use-pico/client";
import { Kysely, withBoolSchema, withJsonSchema } from "@use-pico/common";
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
								blueprintId: z.string().min(1),
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
								blueprintId: z.string().min(1),
								name: z.string().min(1),
								x: z.number(),
								y: z.number(),
								from: z.number().int().nonnegative(),
								to: z.number().int().nonnegative(),
								cycle: z.number().int().nonnegative(),
								valid: withBoolSchema(),
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
								.select([
									"bg.id",
									"bg.blueprintId",
									"bg.productionId",
									"bg.recurringProductionId",
									(eb) => {
										return eb
											.selectFrom("Blueprint_Production as bp")
											.innerJoin("Resource as r", "r.id", "bp.resourceId")
											.whereRef("bp.id", "=", "bg.productionId")
											.select("r.name")
											.as("productionName");
									},
									(eb) => {
										return eb
											.selectFrom("Blueprint_Production as bp")
											.innerJoin("Resource as r", "r.id", "bp.resourceId")
											.whereRef("bp.id", "=", "bg.recurringProductionId")
											.select("r.name")
											.as("recurringProductionName");
									},
									(eb) => {
										return eb
											.selectFrom("Production as p")
											.innerJoin(
												"Blueprint_Production as bp",
												"bp.id",
												"p.blueprintProductionId",
											)
											.innerJoin("Resource as r", "r.id", "bp.resourceId")
											.select((eb) => {
												return Kysely.jsonObject({
													id: eb.ref("p.id"),
													name: eb.ref("r.name"),
													cycle: eb.ref("p.cycle"),
													from: eb.ref("p.from"),
													to: eb.ref("p.to"),
												}).as("production");
											})
											.whereRef("p.buildingId", "=", "bg.id")
											.as("production");
									},
									"bl.name",
									"bg.x",
									"bg.y",
								])
								.where("bg.userId", "=", user.id),
							output: z.object({
								id: z.string().min(1),
								blueprintId: z.string().min(1),
								name: z.string().min(1),

								productionId: z.string().nullish(),
								recurringProductionId: z.string().nullish(),

								productionName: z.string().nullish(),
								recurringProductionName: z.string().nullish(),

								production: withJsonSchema(
									z.object({
										id: z.string().min(1),
										name: z.string().min(1),
										cycle: z.number().int().nonnegative(),
										from: z.number().int().nonnegative(),
										to: z.number().int().nonnegative(),
									}),
								).nullish(),

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
				queryKey: ["GameMap", "Cycle", user.id],
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
