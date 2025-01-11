import {
    createFileRoute,
    useLoaderData,
    useRouteContext,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFilter,
    navigateOnFulltext,
    Tx,
    withListCount,
    withSourceSearchSchema,
} from "@use-pico/client";
import {
    FilterSchema,
    withBoolSchema,
    withJsonArraySchema,
} from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { Building_Base_Table } from "~/app/derivean/game/building/Building_Base_Table";
import { Building_Base_Building_Base_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Building_Base_Requirement_Schema";
import { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/construction/list",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(
			{
				filter: FilterSchema,
			},
			{
				size: 30,
			},
		),
	),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({ context: { kysely, session }, deps: { filter, cursor } }) {
		const user = await session();

		return kysely.transaction().execute(async (tx) => {
			const $filter = tx.selectFrom("Building_Base as bb").select([
				"bb.id",
				sql`
                CASE
                  WHEN NOT EXISTS (
                    SELECT 1
                    FROM Building_Base_Resource_Requirement bbrr
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
                    ON bbrr.resourceId = resource.resourceId
                    WHERE bbrr.buildingBaseId = bb.id
                      AND (resource.amount IS NULL OR resource.amount < bbrr.amount)
                  ) THEN true ELSE false END
              `.as("withAvailableResources"),
				sql`
                CASE
                  WHEN NOT EXISTS (
                    SELECT 1
                    FROM Building_Base_Building_Base_Requirement bbbbr
                    LEFT JOIN (
                      SELECT
                        b.buildingBaseId,
                        COUNT(*) AS builtCount
                      FROM
                        Building b
                      WHERE
                        b.userId = ${user.id}
                      GROUP BY
                        b.buildingBaseId
                    ) building
                    ON bbbbr.requirementId = building.buildingBaseId
                    WHERE bbbbr.buildingBaseId = bb.id
                      AND (building.builtCount IS NULL OR building.builtCount < bbbbr.amount)
                  ) THEN true ELSE false END
              `.as("withAvailableBuildings"),
			]);

			return withListCount({
				select: tx
					.selectFrom("Building_Base as bb")
					.innerJoin($filter.as("filter"), "bb.id", "filter.id")
					.select([
						"bb.id",
						"bb.name",
						"bb.cycles",
						"filter.withAvailableBuildings",
						"filter.withAvailableResources",
						(eb) =>
							eb
								.selectFrom("Building_Base_Resource_Requirement as bbrr")
								.innerJoin("Resource as r", "r.id", "bbrr.resourceId")
								.select((eb) => {
									return sql<string>`json_group_array(json_object(
                                                                'id', ${eb.ref("bbrr.id")},
                                                                'amount', ${eb.ref("bbrr.amount")},
                                                                'passive', ${eb.ref("bbrr.passive")},
                                                                'resourceId', ${eb.ref("bbrr.resourceId")},
                                                                'buildingBaseId', ${eb.ref("bbrr.buildingBaseId")},
                                                                'name', ${eb.ref("r.name")}
                                                            ))`.as(
										"requirements",
									);
								})
								.where("bbrr.buildingBaseId", "=", eb.ref("bb.id"))
								.orderBy("r.name", "asc")
								.as("requiredResources"),
						(eb) =>
							eb
								.selectFrom("Building_Base_Building_Base_Requirement as bbbbr")
								.innerJoin(
									"Building_Base as bb2",
									"bb2.id",
									"bbbbr.requirementId",
								)
								.select((eb) => {
									return sql<string>`json_group_array(json_object(
                                                'id', ${eb.ref("bbbbr.id")},
                                                'amount', ${eb.ref("bbbbr.amount")},
                                                'requirementId', ${eb.ref("bbbbr.requirementId")},
                                                'buildingBaseId', ${eb.ref("bbbbr.buildingBaseId")},
                                                'name', ${eb.ref("bb2.name")}
                                            ))`.as("requirements");
								})
								.where("bbbbr.buildingBaseId", "=", eb.ref("bb.id"))
								.orderBy("bb2.name", "asc")
								.as("requiredBuildings"),
					])
					// .where("filter.withAvailableBuildings", "=", true)
					.orderBy("filter.withAvailableBuildings", "desc")
					.orderBy("filter.withAvailableResources", "desc")
					.orderBy("bb.name", "asc"),
				query({ select, where }) {
					let $select = select;

					if (where?.fulltext) {
						const fulltext = `%${where.fulltext}%`.toLowerCase();
						$select = $select.where((eb) => {
							return eb.or([
								eb("bb.id", "like", fulltext),
								eb("bb.name", "like", fulltext),
								eb(
									"bb.id",
									"in",
									eb
										.selectFrom("Building_Base_Resource_Requirement as bbrr")
										.innerJoin("Resource as r", "r.id", "bbrr.resourceId")
										.select("bbrr.buildingBaseId")
										.where((eb) => {
											return eb.or([eb("r.name", "like", fulltext)]);
										}),
								),
								eb(
									"bb.id",
									"in",
									eb
										.selectFrom(
											"Building_Base_Building_Base_Requirement as bbbbr",
										)
										.innerJoin(
											"Building_Base as bb",
											"bb.id",
											"bbbbr.requirementId",
										)
										.select("bbbbr.buildingBaseId")
										.where((eb) => {
											return eb.or([eb("bb.name", "like", fulltext)]);
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
					cycles: z.number().nonnegative(),
					withAvailableBuildings: withBoolSchema(),
					withAvailableResources: withBoolSchema(),
					requiredResources: withJsonArraySchema(
						Building_Base_Resource_Requirement_Schema.entity.merge(
							z.object({
								name: z.string().min(1),
							}),
						),
					),
					requiredBuildings: withJsonArraySchema(
						Building_Base_Building_Base_Requirement_Schema.entity.merge(
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
	component() {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;
		const { inventory, session, buildingCounts } = useLoaderData({
			from: "/$locale/apps/derivean/game",
		});
		const { graph } = useLoaderData({
			from: "/$locale/apps/derivean/game/building/construction",
		});

		return (
			<div className={tv.base()}>
				<Building_Base_Table
					userId={session.id}
					inventory={inventory}
					buildingCounts={buildingCounts}
					graph={graph}
					table={{
						data,
						filter: {
							value: filter,
							set: navigateOnFilter(navigate),
						},
					}}
					fulltext={{
						value: filter?.fulltext,
						set: navigateOnFulltext(navigate),
					}}
					cursor={{
						count,
						cursor,
						textTotal: <Tx label={"Number of items"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
