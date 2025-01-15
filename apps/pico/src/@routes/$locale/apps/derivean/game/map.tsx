import dagre from "@dagrejs/dagre";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { withList } from "@use-pico/client";
import { sql } from "kysely";
import { z } from "zod";
import { GameMap } from "~/app/derivean/game/GameMap";
import { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { withLayout } from "~/app/derivean/utils/withLayout";

export const Route = createFileRoute("/$locale/apps/derivean/game/map")({
	validateSearch: zodValidator(
		z.object({
			resourceId: z.string().optional(),
		}),
	),
	loaderDeps({ search: { resourceId } }) {
		return {
			resourceId,
		};
	},
	async loader({
		context: { queryClient, kysely, session },
		deps: { resourceId },
	}) {
		const user = await session();

		const data = await queryClient.ensureQueryData({
			queryKey: ["Management", user.id],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					const $blueprintFilter = tx.selectFrom("Blueprint as bl").select([
						"bl.id",
						sql`
                        CASE
                          WHEN NOT EXISTS (
                            SELECT 1
                            FROM Blueprint_Requirement br
                            LEFT JOIN (
                              SELECT
                                i.resourceId,
                                i.amount
                              FROM
                                Inventory i
                              INNER JOIN User_Inventory ui
                                ON i.id = ui.inventoryId
                              WHERE
                                ui.userId = ${user.id}
                              GROUP BY
                                i.resourceId
                            ) resource
                            ON br.resourceId = resource.resourceId
                            WHERE br.blueprintId = bl.id
                              AND (resource.amount IS NULL OR resource.amount < br.amount)
                          ) THEN true ELSE false END
                      `.as("withAvailableResources"),
						sql`
                        CASE
                          WHEN NOT EXISTS (
                            SELECT 1
                            FROM Blueprint_Dependency bd
                            LEFT JOIN (
                              SELECT
                                b.blueprintId,
                                COUNT(*) AS builtCount
                              FROM
                                Building b
                              WHERE
                                b.userId = ${user.id}
                              GROUP BY
                                b.blueprintId
                            ) building
                            ON bd.dependencyId = building.blueprintId
                            WHERE bd.blueprintId = bl.id
                              AND (building.builtCount IS NULL OR building.builtCount < 1)
                          ) THEN true ELSE false END
                      `.as("withAvailableBuildings"),
					]);

					return withList({
						select: tx
							.selectFrom("Blueprint as bl")
							.innerJoin($blueprintFilter.as("filter"), "bl.id", "filter.id")
							.leftJoin("Building as bg", "bg.blueprintId", "bl.id")
							.select([
								"bl.id",
								"bl.name",
								"bl.cycles",
								"bl.productionLimit",
								"filter.withAvailableBuildings",
								"filter.withAvailableResources",
								(eb) =>
									eb
										.selectFrom("Building as bg")
										.select((eb) => {
											return sql<string>`json_object(
                                                'id', ${eb.ref("bg.id")}
                                            )`.as("building");
										})
										.whereRef("bg.blueprintId", "=", "bl.id")
										.where("bg.userId", "=", user.id)
										.as("building"),
								(eb) => {
									return eb
										.selectFrom("Production as p")
										.innerJoin(
											"Blueprint_Production as bp",
											"bp.id",
											"p.blueprintProductionId",
										)
										.select((eb) => eb.fn.count("p.id").as("count"))
										.whereRef("bp.blueprintId", "=", "bl.id")
										.where("p.userId", "=", user.id)
										.as("productionCount");
								},
								(eb) =>
									eb
										.selectFrom("Blueprint_Requirement as br")
										.innerJoin("Resource as r", "r.id", "br.resourceId")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                'id', ${eb.ref("br.id")},
                                                'amount', ${eb.ref("br.amount")},
                                                'passive', ${eb.ref("br.passive")},
                                                'resourceId', ${eb.ref("br.resourceId")},
                                                'blueprintId', ${eb.ref("br.blueprintId")},
                                                'name', ${eb.ref("r.name")}
                                            ))`.as("requirements");
										})
										.whereRef("br.blueprintId", "=", "bl.id")
										.orderBy("r.name", "asc")
										.as("requirements"),
								(eb) =>
									eb
										.selectFrom("Blueprint_Dependency as bd")
										.innerJoin("Blueprint as bl2", "bl2.id", "bd.dependencyId")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                        'id', ${eb.ref("bd.id")},
                                                        'dependencyId', ${eb.ref("bd.dependencyId")},
                                                        'blueprintId', ${eb.ref("bd.blueprintId")},
                                                        'name', ${eb.ref("bl2.name")}
                                                    ))`.as("requirements");
										})
										.whereRef("bd.blueprintId", "=", "bl.id")
										.orderBy("bl2.name", "asc")
										.as("dependencies"),
								(eb) =>
									eb
										.selectFrom("Construction as c")
										.innerJoin("Blueprint as bl2", "bl2.id", "c.blueprintId")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                        'id', ${eb.ref("c.id")},
                                                        'cycle', ${eb.ref("c.cycle")},
                                                        'from', ${eb.ref("c.from")},
                                                        'to', ${eb.ref("c.to")},
                                                        'name', ${eb.ref("bl2.name")}
                                                    ))`.as("requirements");
										})
										.whereRef("c.blueprintId", "=", "bl.id")
										.where("c.userId", "=", user.id)
										.orderBy("bl2.name", "asc")
										.as("construction"),
								(eb) =>
									eb
										.selectFrom("Blueprint_Production as bp")
										.innerJoin("Resource as r", "r.id", "bp.resourceId")
										.leftJoin("Building as b", (eb) => {
											return eb
												.onRef("b.blueprintId", "=", "bp.blueprintId")
												.on("b.userId", "=", user.id);
										})
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                        'id', ${eb.ref("bp.id")},
                                                        'amount', ${eb.ref("bp.amount")},
                                                        'cycles', ${eb.ref("bp.cycles")},
                                                        'limit', ${eb.ref("bp.limit")},
                                                        'blueprintId', ${eb.ref("bp.blueprintId")},
                                                        'resourceId', ${eb.ref("bp.resourceId")},
                                                        'buildingId', ${eb.ref("b.id")},
                                                        'name', ${eb.ref("r.name")},
                                                        'requirements', ${sql`(
                                                            SELECT
                                                                json_group_array(json_object(
                                                                    'id', bpr.id,
                                                                    'amount', bpr.amount,
                                                                    'passive', bpr.passive,
                                                                    'name', r2.name,
                                                                    'blueprintId', bp.id,
                                                                    'resourceId', bpr.resourceId
                                                                ))
                                                            FROM
                                                                Blueprint_Production_Requirement as bpr
                                                                INNER JOIN Resource as r2 on r2.id = bpr.resourceId
                                                            WHERE
                                                                bpr.blueprintProductionId = bp.id
                                                        )
                                                            `},
                                                        'queue', ${sql`(
                                                            SELECT
                                                                json_group_array(json_object(
                                                                    'id', p.id,
                                                                    'from', p."from",
                                                                    'to', p."to",
                                                                    'cycle', p."cycle",
                                                                    'blueprintProductionId', p.blueprintProductionId
                                                                ))
                                                            FROM
                                                                Production as p
                                                            WHERE
                                                                p.blueprintProductionId = bp.id AND
                                                                p.id in (SELECT id FROM Production WHERE userId = ${user.id})
                                                        )
                                                            `}
                                                    ))`.as("sub");
										})
										.$if(Boolean(resourceId), (eb) => {
											return eb.where("bp.resourceId", "=", resourceId!);
										})
										.whereRef("bp.blueprintId", "=", "bl.id")
										.orderBy("r.name", "asc")
										.as("production"),
							])
							.$if(Boolean(resourceId), (eb) => {
								return eb.where(
									"bl.id",
									"in",
									tx
										.selectFrom("Blueprint_Production")
										.select("blueprintId")
										.where("resourceId", "=", resourceId!),
								);
							})
							// .where("filter.withAvailableBuildings", "=", true)
							.orderBy("bl.sort", "asc")
							.orderBy("bl.name", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`.toLowerCase();
								$select = $select.where((eb) => {
									return eb.or([
										eb("bl.id", "like", fulltext),
										eb("bl.name", "like", fulltext),
										eb(
											"bl.id",
											"in",
											eb
												.selectFrom("Blueprint_Production as bp")
												.innerJoin("Resource as r", "r.id", "bp.resourceId")
												.select("bp.blueprintId")
												.where((eb) => {
													return eb.or([eb("r.name", "like", fulltext)]);
												}),
										),
									]);
								});
							}

							return $select;
						},
						output: MapSchema,
						cursor: {
							page: 0,
							/**
							 * List max. of 250 buildings
							 */
							size: 250,
						},
					});
				});
			},
		});

		return {
			data,
			graph: withLayout({
				graph: new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({})),
				nodes: data.map((data) => {
					let type = "blueprint";

					if (data.construction?.[0]) {
						type = "construction";
					} else if (data.building) {
						type = "building";
					} else if (
						data.withAvailableResources &&
						data.withAvailableBuildings
					) {
						type = "blueprint-available";
					} else if (
						data.withAvailableResources &&
						!data.withAvailableBuildings
					) {
						type = "blueprint-missing-buildings";
					} else if (
						data.withAvailableBuildings &&
						!data.withAvailableResources
					) {
						type = "blueprint-missing-resources";
					} else if (
						!data.withAvailableBuildings &&
						!data.withAvailableResources
					) {
						type = "blueprint-unavailable";
					}

					return {
						id: data.id,
						data,
						position: { x: 0, y: 0 },
						type,
					};
				}),
				edges: (
					await kysely
						.selectFrom("Blueprint_Dependency")
						.select(["id", "blueprintId", "dependencyId"])
						.execute()
				).map(({ id, blueprintId, dependencyId }) => {
					return {
						id,
						source: dependencyId,
						target: blueprintId,
						type: "dependency",
					};
				}),
			}),
			inventory: await queryClient.ensureQueryData({
				queryKey: ["User_Inventory", "list", user.id],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return tx
							.selectFrom("Inventory as i")
							.innerJoin("User_Inventory as ui", "ui.inventoryId", "i.id")
							.select(["i.id", "i.amount", "i.resourceId", "i.limit"])
							.where("ui.userId", "=", user.id)
							.execute();
					});
				},
			}),
			buildingCounts: await queryClient.ensureQueryData({
				queryKey: ["Building"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return tx
							.selectFrom("Building as b")
							.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
							.select([
								"b.blueprintId",
								"bl.name",
								(eb) => eb.fn.count<number>("bl.id").as("count"),
							])
							.where("b.userId", "=", user.id)
							.groupBy("b.blueprintId")
							.execute();
					});
				},
			}),
		};
	},
	component() {
		const { data, graph } = Route.useLoaderData();
		const { session, cycle } = useLoaderData({
			from: "/$locale/apps/derivean/game",
		});

		return (
			<GameMap
				data={data}
				graph={graph}
				userId={session.id}
			/>
		);
	},
});
