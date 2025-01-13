import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFulltext,
    withListCount,
    withSourceSearchSchema,
} from "@use-pico/client";
import {
    FilterSchema,
    withBoolSchema,
    withJsonArraySchema,
    withJsonSchema,
} from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { GameManager } from "~/app/derivean/game/manager/GameManager";
import { BlueprintDependencySchema } from "~/app/derivean/schema/BlueprintDependencySchema";
import { BlueprintRequirementSchema } from "~/app/derivean/schema/BlueprintRequirementSchema";
import { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";
import { withBlueprintUpgradeGraph } from "~/app/derivean/utils/withBlueprintUpgradeGraph";

export const Route = createFileRoute("/$locale/apps/derivean/game/management")({
	validateSearch: zodValidator(
		withSourceSearchSchema({
			filter: FilterSchema.merge(
				z.object({
					blueprintId: z.string().optional(),
					resourceId: z.string().optional(),
				}),
			),
		}),
	),
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
			queryKey: ["Management", user.id, { filter, cursor }],
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

					return withListCount({
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
										.selectFrom("Blueprint as bu")
										.innerJoin(
											$blueprintFilter.as("filter"),
											"bu.id",
											"filter.id",
										)
										.select((eb) => {
											return sql<string>`json_object(
                                                'id', ${eb.ref("bu.id")},
                                                'name', ${eb.ref("bu.name")},
                                                'cycles', ${eb.ref("bu.cycles")},
                                                'withAvailableBuildings', ${eb.ref("filter.withAvailableBuildings")},
                                                'withAvailableResources', ${eb.ref("filter.withAvailableResources")},
                                                'requirements', ${sql`(
                                                    SELECT
                                                        json_group_array(json_object(
                                                            'id', br.id,
                                                            'amount', br.amount,
                                                            'passive', br.passive,
                                                            'name', r2.name,
                                                            'blueprintId', bu.id,
                                                            'resourceId', br.resourceId
                                                        ))
                                                    FROM
                                                        Blueprint_Requirement as br
                                                        INNER JOIN Resource as r2 on r2.id = br.resourceId
                                                    WHERE
                                                        br.blueprintId = bu.id
                                                    ORDER BY
                                                        r2.name
                                                    ),
                                                    'dependencies', ${sql`(
                                                        SELECT
                                                            json_group_array(json_object(
                                                                'id', bd.id,
                                                                'dependencyId', bd.dependencyId,
                                                                'blueprintId', bd.blueprintId,
                                                                'name', b2.name
                                                            ))
                                                        FROM
                                                            Blueprint_Dependency as bd
                                                            INNER JOIN Blueprint as b2 ON b2.id = bd.dependencyId
                                                        WHERE
                                                            bd.blueprintId = bu.id
                                                    )`}
                                                    `}
                                            )`.as("upgradeTo");
										})
										.whereRef("bu.id", "=", "bl.upgradeId")
										.as("upgradeTo"),
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
										.$if(Boolean(filter?.resourceId), (eb) => {
											return eb.where(
												"bp.resourceId",
												"=",
												filter!.resourceId!,
											);
										})
										.whereRef("bp.blueprintId", "=", "bl.id")
										.orderBy("r.name", "asc")
										.as("production"),
							])
							.$if(Boolean(filter?.resourceId), (eb) => {
								return eb.where(
									"bl.id",
									"in",
									tx
										.selectFrom("Blueprint_Production")
										.select("blueprintId")
										.where("resourceId", "=", filter!.resourceId!),
								);
							})
							.where("filter.withAvailableBuildings", "=", true)
							.where((eb) => {
								return eb.or([
									eb("bg.isUpgraded", "=", false),
									eb("bg.isUpgraded", "is", null),
								]);
							})
							/**
							 * Filter out blueprints which are upgrades of another blueprints
							 */
							.where(
								"bl.id",
								"not in",
								tx
									.selectFrom("Blueprint as bl")
									.innerJoin("Building as bg", "bg.blueprintId", "bl.id")
									.select("upgradeId")
									/**
									 * I don't like any, but necessary evil as the result is correct, but Kysely don't see it
									 */
									.where("upgradeId", "is not", null)
									.where("bg.userId", "=", user.id)
									.where("bg.isUpgraded", "=", false) as any,
							)
							.orderBy("bl.sort", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.blueprintId) {
								$select = $select.where("bl.id", "=", where.blueprintId);
							}

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
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							cycles: z.number().int().nonnegative(),
							productionLimit: z.number().int().nonnegative(),
							withAvailableBuildings: withBoolSchema(),
							withAvailableResources: withBoolSchema(),
							upgradeTo: withJsonSchema(
								z.object({
									id: z.string().min(1),
									name: z.string().min(1),
									cycles: z.number().int().nonnegative(),
									withAvailableBuildings: withBoolSchema(),
									withAvailableResources: withBoolSchema(),
									requirements: z.array(
										BlueprintRequirementSchema.entity.merge(
											z.object({
												name: z.string().min(1),
											}),
										),
									),
									dependencies: z.array(
										BlueprintDependencySchema.entity.merge(
											z.object({
												name: z.string().min(1),
											}),
										),
									),
								}),
							).nullish(),
							construction: withJsonArraySchema(
								z.object({
									id: z.string().min(1),
									from: z.number().int().nonnegative(),
									to: z.number().int().nonnegative(),
									cycle: z.number().int().nonnegative(),
								}),
							),
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
									queue: z.array(
										z.object({
											id: z.string().min(1),
											blueprintProductionId: z.string().min(1),
											from: z.number().int().nonnegative(),
											to: z.number().int().nonnegative(),
											cycle: z.number().int().nonnegative(),
										}),
									),
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
		const { session, cycle } = useLoaderData({
			from: "/$locale/apps/derivean/game",
		});
		const { filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();

		console.log("Data", data.data);

		/**
		 * TODO When filter is applied, queue count is wrong (under limit), thus it's possible to queue more resources than productionLimit allows; move this to SQL query
		 */

		return (
			<GameManager
				data={data}
				userId={session.id}
				cycle={cycle}
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
