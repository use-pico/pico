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
import { withBoolSchema, withJsonArraySchema } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { Building_Base_Production_Table } from "~/app/derivean/game/building/Building_Base_Production_Table";
import { Building_Base_Production_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Production_Requirement_Schema";
import { Building_Base_Production_Schema } from "~/app/derivean/schema/building/Building_Base_Production_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/production/resource/list",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(Building_Base_Production_Schema, { size: 100 }),
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

		return queryClient.ensureQueryData({
			queryKey: [
				"Building_Base_Production",
				"list-count",
				"production",
				{ filter, cursor },
			],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					const $filter = tx
						.selectFrom("Building_Base_Production as bbp")
						.select([
							"bbp.id as buildingBaseProductionId",
							sql`
                        CASE
        WHEN NOT EXISTS (
            SELECT 1
            FROM Building_Base_Production_Requirement bbpr
            LEFT JOIN (
                SELECT 
                    i.resourceId,
                    SUM(i.amount) AS totalAmount
                FROM Inventory i
                INNER JOIN User_Inventory ui 
                    ON i.id = ui.inventoryId
                WHERE ui.userId = ${user.id}
                GROUP BY i.resourceId
            ) resource
                ON bbpr.resourceId = resource.resourceId
            WHERE
                bbp.id = bbpr.buildingBaseProductionId AND
                (resource.totalAmount IS NULL OR resource.totalAmount < bbpr.amount)
        ) THEN true ELSE false END
                      `.as("withAvailableResources"),
						]);

					return withListCount({
						select: tx
							.selectFrom(
								tx
									.selectFrom("Building_Base_Production as bbp")
									.innerJoin(
										"Building_Base as bb",
										"bb.id",
										"bbp.buildingBaseId",
									)
									.innerJoin(
										$filter.as("filter"),
										"bbp.id",
										"filter.buildingBaseProductionId",
									)
									.innerJoin(
										"Building as b",
										"b.buildingBaseId",
										"bbp.buildingBaseId",
									)
									.innerJoin("Resource as r", "r.id", "bbp.resourceId")
									.select([
										"bbp.id",
										"r.name",
										"bbp.amount",
										"b.id as buildingId",
										"bbp.buildingBaseId",
										"bb.productionLimit",
										"bbp.limit",
										"bbp.cycles",
										"bbp.resourceId",
										"filter.withAvailableResources",
										(eb) =>
											eb
												.selectFrom(
													"Building_Base_Production_Requirement as bbpr",
												)
												.innerJoin("Resource as r", "r.id", "bbpr.resourceId")
												.select((eb) => {
													return sql<string>`json_group_array(json_object(
                                            'id', ${eb.ref("bbpr.id")},
                                            'amount', ${eb.ref("bbpr.amount")},
                                            'passive', ${eb.ref("bbpr.passive")},
                                            'buildingBaseProductionId', ${eb.ref("bbpr.buildingBaseProductionId")},
                                            'resourceId', ${eb.ref("bbpr.resourceId")},
                                            'name', ${eb.ref("r.name")}
                                        ))`.as("requirements");
												})
												.where(
													"bbpr.buildingBaseProductionId",
													"=",
													eb.ref("bbp.id"),
												)
												.as("requirements"),
										(eb) => {
											return eb
												.selectFrom("Building_Resource_Queue as brq")
												.select((eb) => {
													return eb.fn.count<number>("brq.id").as("queueCount");
												})
												.whereRef("brq.buildingId", "=", "b.id")
												.as("queueCount");
										},
									])
									.where("b.userId", "=", user.id)
									.as("source"),
							)
							.selectAll()
							.orderBy("source.withAvailableResources", "desc")
							.orderBy("source.queueCount", "asc")
							.orderBy("source.name", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`.toLowerCase();

								$select = $select.where((qb) => {
									return qb.or([
										qb("name", "like", `%${fulltext}%`),
										qb(
											"resourceId",
											"in",
											qb
												.selectFrom("Resource_Tag as rt")
												.innerJoin("Tag as t", "t.id", "rt.tagId")
												.select("rt.resourceId")
												.where((eb) => {
													return eb.or([
														eb("t.code", "like", fulltext),
														eb("t.label", "like", fulltext),
														eb("t.group", "like", fulltext),
													]);
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
							buildingBaseId: z.string().min(1),
							buildingId: z.string().min(1),
							resourceId: z.string().min(1),
							amount: z.number().nonnegative(),
							productionLimit: z.number().nonnegative(),
							queueCount: z.number().nonnegative(),
							limit: z.number().nonnegative(),
							cycles: z.number().nonnegative(),
							withAvailableResources: withBoolSchema(),
							requirements: withJsonArraySchema(
								Building_Base_Production_Requirement_Schema.entity.merge(
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
	},
	component() {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const { inventory, session } = useLoaderData({
			from: "/$locale/apps/derivean/game",
		});
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<Building_Base_Production_Table
					userId={session.id}
					inventory={inventory}
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
						textTotal: <Tx label={"Number of productions (label)"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
