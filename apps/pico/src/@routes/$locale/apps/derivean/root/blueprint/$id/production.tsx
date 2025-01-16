import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFilter,
    navigateOnFulltext,
    navigateOnSelection,
    Tx,
    withListCount,
    withSourceSearchSchema,
} from "@use-pico/client";
import { withJsonArraySchema } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { BlueprintProductionTable } from "~/app/derivean/root/BlueprintProductionTable";
import { BlueprintProductionRequirementSchema } from "~/app/derivean/schema/BlueprintProductionRequirementSchema";
import { BlueprintProductionSchema } from "~/app/derivean/schema/BlueprintProductionSchema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/$id/production",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(BlueprintProductionSchema),
	),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({
		context: { queryClient, kysely },
		deps: { filter, cursor },
		params: { id },
	}) {
		return queryClient.ensureQueryData({
			queryKey: ["Blueprint_Production", "list-count", id, { filter, cursor }],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Blueprint_Production as bp")
							.innerJoin("Blueprint as bl", "bl.id", "bp.blueprintId")
							.innerJoin("Resource as r", "r.id", "bp.resourceId")
							.select([
								"bp.id",
								"r.name",
								"bp.amount",
								"bp.blueprintId",
								"bp.limit",
								"bp.cycles",
								"bp.resourceId",
								(eb) =>
									eb
										.selectFrom("Blueprint_Production_Requirement as bpr")
										.innerJoin("Resource as r", "r.id", "bpr.resourceId")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                'id', ${eb.ref("bpr.id")},
                                                'amount', ${eb.ref("bpr.amount")},
                                                'passive', ${eb.ref("bpr.passive")},
                                                'blueprintProductionId', ${eb.ref("bpr.blueprintProductionId")},
                                                'resourceId', ${eb.ref("bpr.resourceId")},
                                                'name', ${eb.ref("r.name")}
                                            ))`.as("requirements");
										})
										.whereRef("bpr.blueprintProductionId", "=", "bp.id")
										.as("requirements"),
							])
							.where("bp.blueprintId", "=", id)
							.orderBy("r.name", "asc"),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							blueprintId: z.string().min(1),
							resourceId: z.string().min(1),
							amount: z.number().nonnegative(),
							limit: z.number().nonnegative(),
							cycles: z.number().nonnegative(),
							requirements: withJsonArraySchema(
								BlueprintProductionRequirementSchema.entity.merge(
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
		const { filter, cursor, selection } = Route.useSearch();
		const { id } = Route.useParams();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BlueprintProductionTable
					blueprintId={id}
					table={{
						data,
						filter: {
							value: filter,
							set: navigateOnFilter(navigate),
						},
						selection: {
							type: "multi",
							value: selection,
							set: navigateOnSelection(navigate),
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
