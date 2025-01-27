import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { withList } from "@use-pico/client";
import { Kysely, tvc, withBoolSchema, withJsonSchema } from "@use-pico/common";
import { useMemo } from "react";
import { z } from "zod";
import type { BuildingWaypointEdge } from "~/app/derivean/game/GameMap2/Edge/BuildingWaypointEdge";
import type { RouteEdge } from "~/app/derivean/game/GameMap2/Edge/RouteEdge";
import { GameMap2 } from "~/app/derivean/game/GameMap2/GameMap2";
import type { BuildingNode } from "~/app/derivean/game/GameMap2/Node/BuildingNode/BuildingNode";
import type { BuildingRouteNode } from "~/app/derivean/game/GameMap2/Node/BuildingNode/BuildingRouteNode";
import type { ConstructionNode } from "~/app/derivean/game/GameMap2/Node/ConstructionNode";
import type { LandNode } from "~/app/derivean/game/GameMap2/Node/LandNode";
import type { QueueNode } from "~/app/derivean/game/GameMap2/Node/QueueNode";
import type { WaypointNode } from "~/app/derivean/game/GameMap2/Node/WaypointNode/WaypointNode";
import type { WaypointRouteNode } from "~/app/derivean/game/GameMap2/Node/WaypointNode/WaypointRouteNode";

const width = 384;
const height = 128;

const NodeCss = [
	"p-2",
	"bg-white",
	"rounded-lg",
	"border-[4px]",
	"border-slate-300",
];

export const Route = createFileRoute("/$locale/apps/derivean/map/$mapId")({
	validateSearch: zodValidator(
		z.object({
			zoomToId: z.string().optional(),
			routing: z.boolean().optional(),
		}),
	),
	loaderDeps: ({ search: { routing } }) => ({ routing }),
	async loader({
		context: { queryClient, kysely, session },
		params: { mapId },
		deps: { routing },
	}) {
		const user = await session();

		return {
			user,
			land: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "land", "list"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						const source = await withList({
							select: tx
								.selectFrom("Land as l")
								.innerJoin("Region as r", "r.id", "l.regionId")
								.select([
									"l.id",
									"r.name",
									"r.color",
									"l.x",
									"l.y",
									"l.width",
									"l.height",
								])
								.where("l.mapId", "=", mapId)
								.orderBy("r.name"),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								color: z.string().min(1),
								x: z.number().int(),
								y: z.number().int(),
								width: z.number().int(),
								height: z.number().int(),
							}),
						});

						return source.map(
							(land) =>
								({
									id: land.id,
									position: {
										x: land.x,
										y: land.y,
									},
									width: land.width,
									height: land.height,
									selectable: true,
									draggable: false,
									data: land,
									type: "land",
									className: tvc(NodeCss, [
										land.color,
										"border-slate-600",
										"opacity-25",
									]),
									zIndex: -1,
								}) satisfies LandNode.LandNode,
						);
					});
				},
			}),
			construction: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "construction"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						const source = await withList({
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

						return source.map(
							(construction) =>
								({
									id: construction.id,
									data: construction,
									position: {
										x: construction.x,
										y: construction.y,
									},
									type: "construction",
									width,
									height,
									selectable: false,
									className: tvc(NodeCss, [
										construction.valid ?
											["border-green-500"]
										:	["border-red-500"],
									]),
									extent: "parent",
									parentId: construction.landId,
								}) satisfies ConstructionNode.ConstructionNode,
						);
					});
				},
			}),
			queue: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "queue", { routing }],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						const source = await withList({
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

						return source.map(
							(queue) =>
								({
									id: queue.id,
									data: queue,
									position: {
										x: queue.x,
										y: queue.y,
									},
									type: routing ? "building-route" : "queue",
									width,
									height,
									selectable: false,
									className: tvc(
										NodeCss,
										["border-amber-400", "bg-amber-50"],
										queue.valid ? undefined : ["border-red-500"],
									),
									extent: "parent",
									parentId: queue.landId,
								}) satisfies
									| BuildingRouteNode.BuildingRouteNode
									| QueueNode.QueueNode,
						);
					});
				},
			}),
			building: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "building", { routing }],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						const source = await withList({
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
									"bg.userId",
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
								userId: z.string().min(1),
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

						return source.map(
							(building) =>
								({
									id: building.id,
									data: building,
									position: {
										x: building.x,
										y: building.y,
									},
									type: routing ? "building-route" : "building",
									width,
									height,
									className: tvc(
										NodeCss,
										building.valid ? undefined : ["border-red-500"],
									),
									extent: "parent",
									parentId: building.landId,
								}) satisfies
									| BuildingRouteNode.BuildingRouteNode
									| BuildingNode.BuildingNode,
						);
					});
				},
			}),
			waypoint: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "waypoint", "list", { routing }],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						const source = await withList({
							select: tx
								.selectFrom("Waypoint as wp")
								.select(["wp.id", "wp.x", "wp.y"])
								.where("wp.mapId", "=", mapId),
							output: z.object({
								id: z.string().min(1),
								x: z.number(),
								y: z.number(),
							}),
						});

						return source.map(
							(waypoint) =>
								({
									id: waypoint.id,
									data: waypoint,
									position: {
										x: waypoint.x,
										y: waypoint.y,
									},
									type: routing ? "waypoint-route" : "waypoint",
									width: 64,
									height: 64,
									selectable: true,
									className: tvc([
										"rounded-md",
										"bg-sky-100",
										"border",
										"border-sky-400",
										"p-2",
									]),
								}) satisfies
									| WaypointRouteNode.WaypointRouteNode
									| WaypointNode.WaypointNode,
						);
					});
				},
			}),
			route: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "route", "list"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						const source = await withList({
							select: tx
								.selectFrom("Route as r")
								.select(["r.id", "r.fromId", "r.toId"])
								.where("r.userId", "=", user.id),
							output: z.object({
								id: z.string().min(1),
								fromId: z.string().min(1),
								toId: z.string().min(1),
							}),
						});

						return source.map(
							(route) =>
								({
									id: route.id,
									source: route.fromId,
									target: route.toId,
									type: "route",
									style: {
										stroke: "#b1b1b7",
										strokeWidth: 5,
									},
								}) satisfies RouteEdge.RouteEdge,
						);
					});
				},
			}),
			buildingWaypoint: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "buildingWaypoint", "list"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						const source = await withList({
							select: tx
								.selectFrom("Building_Waypoint as bw")
								.select(["bw.id", "bw.buildingId", "bw.waypointId"])
								.leftJoin("Building as b", "b.id", "bw.buildingId")
								.leftJoin("Land as l", "l.id", "b.landId")
								.where("b.userId", "=", user.id)
								.where("l.mapId", "=", mapId),
							output: z.object({
								id: z.string().min(1),
								buildingId: z.string().min(1),
								waypointId: z.string().min(1),
							}),
						});

						return source.map(
							(buildingWaypoint) =>
								({
									id: buildingWaypoint.id,
									source: buildingWaypoint.buildingId,
									target: buildingWaypoint.waypointId,
									type: "building-waypoint",
									style: {
										stroke: "#b1b1b7",
										strokeWidth: 2,
										pointerEvents: "all",
									},
								}) satisfies BuildingWaypointEdge.BuildingWaypointEdge,
						);
					});
				},
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
		const {
			user,
			land,
			construction,
			queue,
			building,
			waypoint,
			route,
			buildingWaypoint,
			cycle,
		} = Route.useLoaderData();
		const { zoomToId, routing } = Route.useSearch();

		const nodes = useMemo(
			() => [...land, ...construction, ...queue, ...building, ...waypoint],
			[construction, queue, building, waypoint, land],
		);
		const edges = useMemo(
			() => [...route, ...buildingWaypoint],
			[route, buildingWaypoint],
		);

		return (
			<GameMap2
				userId={user.id}
				cycle={cycle}
				nodes={nodes}
				edges={edges}
				zoomToId={zoomToId}
				routing={routing}
			/>
		);
	},
});
