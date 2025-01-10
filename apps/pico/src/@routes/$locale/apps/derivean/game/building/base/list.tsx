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
import { FilterSchema } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { Building_Base_Table } from "~/app/derivean/game/building/Building_Base_Table";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/base/list",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema({
			filter: FilterSchema,
		}),
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
					])
					.where("filter.withAvailableResources", "=", true)
					.orderBy("bb.name", "asc"),
				output: z.object({
					id: z.string().min(1),
					name: z.string().min(1),
					cycles: z.number().nonnegative(),
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
		const { session } = useLoaderData({
			from: "/$locale/apps/derivean/game",
		});

		return (
			<div className={tv.base()}>
				<Building_Base_Table
					userId={session.id}
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
