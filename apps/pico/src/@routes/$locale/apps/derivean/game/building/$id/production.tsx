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
	"/$locale/apps/derivean/game/building/$id/production",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(Building_Base_Production_Schema),
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
		params: { id },
	}) {
		const user = await session();

		return queryClient.ensureQueryData({
			queryKey: [
				"Building_Base_Production",
				"list-count",
				id,
				{ filter, cursor },
			],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					const $filter = tx
						.selectFrom("Building_Base_Production as bbp")
						.select([
							"bbp.id",
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
							.selectFrom("Building_Base_Production as bbp")
							.innerJoin("Building_Base as bb", "bb.id", "bbp.buildingBaseId")
							.innerJoin($filter.as("filter"), "bbp.id", "filter.id")
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
								"bbp.buildingBaseId",
								"bbp.limit",
								"bbp.cycles",
								"bbp.resourceId",
								"filter.withAvailableResources",
								(eb) =>
									eb
										.selectFrom("Building_Base_Production_Requirement as bbpr")
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
							])
							.where("b.userId", "=", user.id)
							.where("b.id", "=", id)
							.orderBy("r.name", "asc"),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							buildingBaseId: z.string().min(1),
							resourceId: z.string().min(1),
							amount: z.number().nonnegative(),
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
		const { session } = useLoaderData({ from: "/$locale/apps/derivean/game" });
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/game/building/$id",
		});
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<Building_Base_Production_Table
					productionLimit={entity.productionLimit}
					queueCount={entity.queueCount}
					userId={session.id}
					buildingId={entity.id}
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
