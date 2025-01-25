import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { withList } from "@use-pico/client";
import { Kysely, withBoolSchema, withJsonSchema } from "@use-pico/common";
import { z } from "zod";
import { GameMap2 } from "~/app/derivean/game/GameMap2/GameMap2";

export const Route = createFileRoute("/$locale/apps/derivean/map/$mapId")({
	validateSearch: zodValidator(
		z.object({
			zoomToId: z.string().optional(),
			routing: z.boolean().optional(),
		}),
	),
	async loader({
		context: { queryClient, kysely, session },
		params: { mapId },
	}) {
		const user = await session();

		return {
			user,
			construction: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "construction"],
				async queryFn() {
					return kysely.transaction().execute((tx) => {
						return withList({
							select: tx
								.selectFrom("Building as bg")
								.innerJoin("Land as l", "l.id", "bg.landId")
								.innerJoin("Construction as c", "c.id", "bg.constructionId")
								.innerJoin("Blueprint as bl", "bl.id", "bg.blueprintId")
								.select([
									"bg.id",
									"bg.blueprintId",
									"bg.landId",
									"bg.constructionId",
									"bl.name",
									"bg.x",
									"bg.y",
									"bg.valid",
								])
								.where("c.plan", "=", true)
								.where("l.mapId", "=", mapId)
								.where("bg.userId", "=", user.id),
							output: z.object({
								id: z.string().min(1),
								blueprintId: z.string().min(1),
								landId: z.string().min(1),
								constructionId: z.string().min(1),
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
				queryKey: ["GameMap", mapId, "queue"],
				async queryFn() {
					return kysely.transaction().execute((tx) => {
						return withList({
							select: tx
								.selectFrom("Building as bg")
								.innerJoin("Land as l", "l.id", "bg.landId")
								.innerJoin("Construction as c", "c.id", "bg.constructionId")
								.innerJoin("Blueprint as bl", "bl.id", "bg.blueprintId")
								.select([
									"bg.id",
									"bg.blueprintId",
									"bg.landId",
									"bl.name",
									"bg.x",
									"bg.y",
									"bg.valid",
									"c.cycles",
									"c.cycle",
								])
								.where("c.plan", "=", false)
								.where("l.mapId", "=", mapId)
								.where("bg.userId", "=", user.id),
							output: z.object({
								id: z.string().min(1),
								blueprintId: z.string().min(1),
								landId: z.string().min(1),
								name: z.string().min(1),
								x: z.number(),
								y: z.number(),
								cycles: z.number().int().nonnegative(),
								cycle: z.number().int().nonnegative(),
								valid: withBoolSchema(),
							}),
						});
					});
				},
			}),
			building: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "building"],
				async queryFn() {
					return kysely.transaction().execute((tx) => {
						return withList({
							select: tx
								.selectFrom("Building as bg")
								.innerJoin("Land as l", "l.id", "bg.landId")
								.innerJoin("Blueprint as bl", "bl.id", "bg.blueprintId")
								.select([
									"bg.id",
									"bg.blueprintId",
									"bg.landId",
									"bg.productionId",
									"bg.recurringProductionId",
									"bg.valid",
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
													cycles: eb.ref("p.cycles"),
												}).as("production");
											})
											.whereRef("p.buildingId", "=", "bg.id")
											.as("production");
									},
									"bl.name",
									"bg.x",
									"bg.y",
								])
								.where("bg.constructionId", "is", null)
								.where("l.mapId", "=", mapId)
								.where("bg.userId", "=", user.id),
							output: z.object({
								id: z.string().min(1),
								blueprintId: z.string().min(1),
								landId: z.string().min(1),
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
										cycles: z.number().int().nonnegative(),
									}),
								).nullish(),

								x: z.number(),
								y: z.number(),

								valid: withBoolSchema(),
							}),
						});
					});
				},
			}),
			route: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "route"],
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
											.selectFrom("Route_Resource as rr")
											.whereRef("rr.routeId", "=", "r.id")
											.select((eb) =>
												eb.fn.count<number>("rr.id").as("resourceCount"),
											)
											.as("resourceCount");
									},
								])
								.where("r.userId", "=", user.id),
							output: z.object({
								id: z.string().min(1),
								fromId: z.string().min(1),
								toId: z.string().min(1),
								fromName: z.string().min(1),
								toName: z.string().min(1),
								resourceCount: z.number().int().nonnegative(),
							}),
						});
					});
				},
			}),
			land: await kysely.transaction().execute(async (tx) => {
				return withList({
					select: tx
						.selectFrom("Land as l")
						.innerJoin("Region as r", "r.id", "l.regionId")
						.select([
							"l.id",
							"r.name",
							"l.x",
							"l.y",
							"l.width",
							"l.height",
							"l.mapId",
						])
						.where("l.mapId", "=", mapId)
						.orderBy("r.name"),
					output: z.object({
						id: z.string().min(1),
						name: z.string().min(1),
						mapId: z.string().min(1),
						x: z.number().int(),
						y: z.number().int(),
						width: z.number().int(),
						height: z.number().int(),
					}),
				});
			}),
			cycle: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "cycle"],
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
		const { user, construction, queue, building, route, land, cycle } =
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
				land={land}
				zoomToId={zoomToId}
				routing={routing}
			/>
		);
	},
});
