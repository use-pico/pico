import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFulltext,
    withListCount,
    withSourceSearchSchema,
} from "@use-pico/client";
import { withBoolSchema, withJsonArraySchema } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { GameManager } from "~/app/derivean/game/manager/GameManager";
import { BlueprintDependencySchema } from "~/app/derivean/schema/BlueprintDependencySchema";
import { BlueprintRequirementSchema } from "~/app/derivean/schema/BlueprintRequirementSchema";
import { BlueprintSchema } from "~/app/derivean/schema/BlueprintSchema";
import { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";
import { withBlueprintUpgradeGraph } from "~/app/derivean/utils/withBlueprintUpgradeGraph";

export const Route = createFileRoute("/$locale/apps/derivean/game/management")({
	validateSearch: zodValidator(withSourceSearchSchema(BlueprintSchema)),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({
		context: { queryClient, kysely, session },
		deps: { filter, cursor },
	}) {
		const user = await session();

		const data = await queryClient.ensureQueryData({
			queryKey: ["Blueprint", "list-count", user.id, { filter, cursor }],
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

					// 			const $productionFilter = tx
					// 				.selectFrom("Blueprint_Production as bp")
					// 				.select([
					// 					"bp.id as blueprintProductionId",
					// 					sql`
					//                 CASE
					// WHEN NOT EXISTS (
					//     SELECT 1
					//     FROM Blueprint_Production_Requirement bpr
					//     LEFT JOIN (
					//         SELECT
					//             i.resourceId,
					//             SUM(i.amount) AS totalAmount
					//         FROM Inventory i
					//         INNER JOIN User_Inventory ui
					//             ON i.id = ui.inventoryId
					//         WHERE ui.userId = ${user.id}
					//         GROUP BY i.resourceId
					//     ) resource
					//         ON bpr.resourceId = resource.resourceId
					//     WHERE
					//         bpr.blueprintProductionId = bp.id AND
					//         (resource.totalAmount IS NULL OR resource.totalAmount < bpr.amount)
					// ) THEN true ELSE false END
					//               `.as("withAvailableResources"),
					// 				]);

					return withListCount({
						select: tx
							.selectFrom("Blueprint as bl")
							.innerJoin($blueprintFilter.as("filter"), "bl.id", "filter.id")
							.select([
								"bl.id",
								"bl.name",
								"bl.cycles",
								"filter.withAvailableBuildings",
								"filter.withAvailableResources",
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
                                                            `}
                                                    ))`.as("sub");
										})
										.whereRef("bp.blueprintId", "=", "bl.id")
										.orderBy("r.name", "asc")
										.as("production"),
								(eb) =>
									eb
										.selectFrom("Production as p")
										.innerJoin(
											"Blueprint_Production as bp",
											"bp.id",
											"p.blueprintProductionId",
										)
										.innerJoin("Resource as r", "r.id", "bp.resourceId")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                        'id', ${eb.ref("p.id")},
                                                        'blueprintProductionId', ${eb.ref("bp.id")},
                                                        'resourceId', ${eb.ref("r.id")},
                                                        'limit', ${eb.ref("bp.limit")},
                                                        'from', ${eb.ref("p.from")},
                                                        'to', ${eb.ref("p.to")},
                                                        'cycle', ${eb.ref("p.cycle")}
                                                    ))`.as("sub");
										})
										.whereRef("bp.blueprintId", "=", "bl.id")
										.where("p.userId", "=", user.id)
										.orderBy("r.name", "asc")
										.as("productionQueue"),
							])
							.orderBy("bl.sort", "asc"),
						query({ select, where }) {
							const $select = select;

							// if (where?.blueprintId) {
							// 	$select = $select.where("bb.id", "=", where.buildingBaseId);
							// }

							// if (where?.fulltext) {
							// 	const fulltext = `%${where.fulltext}%`.toLowerCase();
							// 	$select = $select.where((eb) => {
							// 		return eb.or([
							// 			eb("bb.id", "like", fulltext),
							// 			eb("bb.name", "like", fulltext),
							// 			eb(
							// 				"bb.id",
							// 				"in",
							// 				eb
							// 					.selectFrom(
							// 						"Building_Base_Resource_Requirement as bbrr",
							// 					)
							// 					.innerJoin("Resource as r", "r.id", "bbrr.resourceId")
							// 					.select("bbrr.buildingBaseId")
							// 					.where((eb) => {
							// 						return eb.or([eb("r.name", "like", fulltext)]);
							// 					}),
							// 			),
							// 			eb(
							// 				"bb.id",
							// 				"in",
							// 				eb
							// 					.selectFrom(
							// 						"Building_Base_Building_Base_Requirement as bbbbr",
							// 					)
							// 					.innerJoin(
							// 						"Building_Base as bb",
							// 						"bb.id",
							// 						"bbbbr.requirementId",
							// 					)
							// 					.select("bbbbr.buildingBaseId")
							// 					.where((eb) => {
							// 						return eb.or([eb("bb.name", "like", fulltext)]);
							// 					}),
							// 			),
							// 		]);
							// 	});
							// }

							return $select;
						},
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							cycles: z.number().int().nonnegative(),
							withAvailableBuildings: withBoolSchema(),
							withAvailableResources: withBoolSchema(),
							requirements: withJsonArraySchema(
								BlueprintRequirementSchema.entity.merge(
									z.object({
										name: z.string().min(1),
									}),
								),
							),
							dependencies: withJsonArraySchema(
								BlueprintDependencySchema.entity.merge(
									z.object({
										name: z.string().min(1),
									}),
								),
							),
							production: withJsonArraySchema(
								z.object({
									id: z.string().min(1),
									name: z.string().min(1),
									amount: z.number().nonnegative(),
									cycles: z.number().int().nonnegative(),
									limit: z.number().int().nonnegative(),
									blueprintId: z.string().min(1),
									resourceId: z.string().min(1),
									buildingId: z.string().nullish(),
									requirements: z.array(
										z.object({
											id: z.string().min(1),
											amount: z.number().nonnegative(),
											passive: withBoolSchema(),
											resourceId: z.string().min(1),
											name: z.string().min(1),
										}),
									),
								}),
							),
							productionQueue: withJsonArraySchema(
								z.object({
									id: z.string().min(1),
									resourceId: z.string().min(1),
									blueprintProductionId: z.string().min(1),
									limit: z.number().int().nonnegative(),
									from: z.number().int().nonnegative(),
									to: z.number().int().nonnegative(),
									cycle: z.number().int().nonnegative(),
								}),
							),
						}),
						filter,
						cursor,
					});
				});
			},
		});

		return {
			data,
			dependencies: await kysely.transaction().execute(async (tx) => {
				return withBlueprintGraph({ tx });
			}),
			upgrades: await kysely.transaction().execute(async (tx) => {
				return withBlueprintUpgradeGraph({ tx });
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
		const { data, dependencies, upgrades, inventory, buildingCounts } =
			Route.useLoaderData();
		const { session } = useLoaderData({ from: "/$locale/apps/derivean/game" });
		const { filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();

		return (
			<GameManager
				data={data}
				userId={session.id}
				dependencies={dependencies}
				upgrades={upgrades}
				inventory={inventory}
				buildingCounts={buildingCounts}
				fulltext={{
					value: filter?.fulltext,
					onFulltext: navigateOnFulltext(navigate),
				}}
				cursor={{
					cursor,
					...navigateOnCursor(navigate),
				}}
			/>
		);
	},
});