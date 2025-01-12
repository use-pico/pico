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
					const $filter = tx.selectFrom("Blueprint as bl").select([
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

					return withListCount({
						select: tx
							.selectFrom("Blueprint as bl")
							.innerJoin($filter.as("filter"), "bl.id", "filter.id")
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
			// buildingCounts: await queryClient.ensureQueryData({
			// 	queryKey: ["Building"],
			// 	async queryFn() {
			// 		return kysely.transaction().execute(async (tx) => {
			// 			return tx
			// 				.selectFrom("Building as b")
			// 				.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
			// 				.select([
			// 					"b.blueprintId",
			// 					"bl.name",
			// 					(eb) => eb.fn.count<number>("bl.id").as("count"),
			// 				])
			// 				.where("b.userId", "=", user.id)
			// 				.groupBy("b.blueprintId")
			// 				.execute();
			// 		});
			// 	},
			// }),
		};
	},
	component() {
		const { data, dependencies, upgrades, inventory } = Route.useLoaderData();
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
				buildingCounts={[]}
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
