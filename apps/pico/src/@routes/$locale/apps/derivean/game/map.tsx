import dagre from "@dagrejs/dagre";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { withList } from "@use-pico/client";
import { Kysely } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { GameMap } from "~/app/derivean/game/GameMap";
import { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { withLayout } from "~/app/derivean/utils/withLayout";

export const Route = createFileRoute("/$locale/apps/derivean/game/map")({
	validateSearch: zodValidator(
		z.object({
			blueprintId: z.string().optional(),
			requirementsOf: z.string().optional(),
		}),
	),
	loaderDeps({ search: { blueprintId, requirementsOf } }) {
		return {
			blueprintId,
			requirementsOf,
		};
	},
	async loader({ context: { queryClient, kysely, session } }) {
		const user = await session();

		const data = await queryClient.ensureQueryData({
			queryKey: ["Management", user.id],
			async queryFn() {
				const data = await kysely.transaction().execute(async (tx) => {
					const $blueprintFilter = tx.selectFrom("Blueprint as bl").select([
						"bl.id",
						sql`
                            CASE
                            WHEN NOT EXISTS (
                                SELECT 1
                                FROM Blueprint_Requirement br
                                WHERE br.blueprintId = bl.id
                                AND NOT EXISTS (
                                    SELECT 1
                                    FROM Inventory i
                                    INNER JOIN User_Inventory ui ON i.id = ui.inventoryId
                                    WHERE ui.userId = ${user.id}
                                    AND i.resourceId = br.resourceId
                                    AND i.amount >= br.amount
                                )
                            ) THEN true ELSE false END
                      `.as("withAvailableResources"),
						sql`
                            CASE
                            WHEN NOT EXISTS (
                                SELECT 1
                                FROM Blueprint_Dependency bd
                                WHERE bd.blueprintId = bl.id
                                AND NOT EXISTS (
                                    SELECT 1
                                    FROM Building b
                                    WHERE b.userId = ${user.id}
                                    AND b.blueprintId = bd.dependencyId
                                )
                            ) THEN true ELSE false END
                      `.as("withAvailableBuildings"),
					]);

					const data = await withList({
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
											return Kysely.jsonObject({
												id: eb.ref("bg.id"),
											}).as("building");
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
											return Kysely.jsonGroupArray({
												id: eb.ref("br.id"),
												amount: eb.ref("br.amount"),
												passive: eb.ref("br.passive"),
												resourceId: eb.ref("br.resourceId"),
												blueprintId: eb.ref("br.blueprintId"),
												name: eb.ref("r.name"),
											}).as("requirements");
										})
										.whereRef("br.blueprintId", "=", "bl.id")
										.orderBy("r.name", "asc")
										.as("requirements"),
								(eb) =>
									eb
										.selectFrom("Blueprint_Dependency as bd")
										.innerJoin("Blueprint as bl2", "bl2.id", "bd.dependencyId")
										.select((eb) => {
											return Kysely.jsonGroupArray({
												id: eb.ref("bd.id"),
												dependencyId: eb.ref("bd.dependencyId"),
												blueprintId: eb.ref("bd.blueprintId"),
												name: eb.ref("bl2.name"),
											}).as("requirements");
										})
										.whereRef("bd.blueprintId", "=", "bl.id")
										.orderBy("bl2.name", "asc")
										.as("dependencies"),
								(eb) =>
									eb
										.selectFrom("Construction as c")
										.innerJoin("Blueprint as bl2", "bl2.id", "c.blueprintId")
										.select((eb) => {
											return Kysely.jsonGroupArray({
												id: eb.ref("c.id"),
												cycle: eb.ref("c.cycle"),
												from: eb.ref("c.from"),
												to: eb.ref("c.to"),
												name: eb.ref("bl2.name"),
											}).as("requirements");
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
											return Kysely.jsonGroupArray({
												id: eb.ref("bp.id"),
												amount: eb.ref("bp.amount"),
												cycles: eb.ref("bp.cycles"),
												limit: eb.ref("bp.limit"),
												buildingId: eb.ref("b.id"),
												blueprintId: eb.ref("bp.blueprintId"),
												resourceId: eb.ref("bp.resourceId"),
												name: eb.ref("r.name"),
												requirements: eb
													.selectFrom("Blueprint_Production_Requirement as bpr")
													.innerJoin(
														"Resource as r2",
														"r2.id",
														"bpr.resourceId",
													)
													.select((eb) => {
														return Kysely.jsonGroupArray({
															id: eb.ref("bpr.id"),
															amount: eb.ref("bpr.amount"),
															passive: eb.ref("bpr.passive"),
															name: eb.ref("r2.name"),
															blueprintId: eb.ref("bp.id"),
															resourceId: eb.ref("bpr.resourceId"),
														}).as("requirements");
													})
													.whereRef("bpr.blueprintProductionId", "=", "bp.id"),
												queue: eb
													.selectFrom("Production as p")
													.innerJoin(
														"Blueprint_Production as bp2",
														"p.blueprintProductionId",
														"bp2.id",
													)
													.innerJoin("Resource as r2", "r2.id", "bp.resourceId")
													.select((eb) => {
														return Kysely.jsonGroupArray({
															id: eb.ref("p.id"),
															name: eb.ref("r2.name"),
															from: eb.ref("p.from"),
															to: eb.ref("p.to"),
															cycle: eb.ref("p.cycle"),
															blueprintProductionId: eb.ref(
																"p.blueprintProductionId",
															),
														}).as("requirements");
													})
													.whereRef("p.blueprintProductionId", "=", "bp.id")
													.where("p.id", "in", (eb) => {
														return eb
															.selectFrom("Production")
															.select("id")
															.where("userId", "=", user.id);
													}),
											}).as("production");
										})
										// .$if(Boolean(resourceId), (eb) => {
										// 	return eb.where("bp.resourceId", "=", resourceId!);
										// })
										.whereRef("bp.blueprintId", "=", "bl.id")
										.orderBy("r.name", "asc")
										.as("production"),
							])
							// .$if(Boolean(resourceId), (eb) => {
							// 	return eb.where(
							// 		"bl.id",
							// 		"in",
							// 		tx
							// 			.selectFrom("Blueprint_Production")
							// 			.select("blueprintId")
							// 			.where("resourceId", "=", resourceId!),
							// 	);
							// })
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

					// console.log(data);

					return data;
				});

				return data;
			},
		});

		return {
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
						// type: "dependency",
					};
				}),
			}),
			inventory: await kysely
				.selectFrom("Inventory as i")
				.innerJoin("User_Inventory as ui", "ui.inventoryId", "i.id")
				.select(["i.id", "i.amount", "i.resourceId", "i.limit"])
				.where("ui.userId", "=", user.id)
				.execute(),
		};
	},
	component() {
		const { graph, inventory } = Route.useLoaderData();
		const { blueprintId, requirementsOf } = Route.useSearch();
		const { session } = useLoaderData({
			from: "/$locale/apps/derivean/game",
		});

		return (
			<GameMap
				graph={graph}
				userId={session.id}
				inventory={inventory}
				blueprintId={blueprintId}
				requirementsOf={requirementsOf}
			/>
		);
	},
});
