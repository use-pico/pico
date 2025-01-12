import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { withListCount, withSourceSearchSchema } from "@use-pico/client";
import { withBoolSchema } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { BlueprintSchema } from "~/app/derivean/schema/BlueprintSchema";

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

		const data = queryClient.ensureQueryData({
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
								"filter.withAvailableBuildings",
								"filter.withAvailableResources",
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
							withAvailableBuildings: withBoolSchema(),
							withAvailableResources: withBoolSchema(),
						}),
						filter,
						cursor,
					});
				});
			},
		});

		return data;
	},
	component() {
		const { data } = Route.useLoaderData();
		const { session } = useLoaderData({ from: "/$locale/apps/derivean/game" });

		return "bla";
	},
});
