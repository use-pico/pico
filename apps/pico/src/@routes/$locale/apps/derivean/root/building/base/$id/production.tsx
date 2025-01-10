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
import { Building_Base_Production_Table } from "~/app/derivean/root/building/Building_Base_Production_Table";
import { Building_Base_Production_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Production_Requirement_Schema";
import { Building_Base_Production_Schema } from "~/app/derivean/schema/building/Building_Base_Production_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/production",
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
		context: { queryClient, kysely },
		deps: { filter, cursor },
		params: { id },
	}) {
		return queryClient.ensureQueryData({
			queryKey: [
				"Building_Base_Production",
				"list-count",
				id,
				{ filter, cursor },
			],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Building_Base_Production as bbp")
							.innerJoin("Building_Base as bb", "bb.id", "bbp.buildingBaseId")
							.innerJoin("Resource as r", "r.id", "bbp.resourceId")
							.select([
								"bbp.id",
								"r.name",
								"bbp.amount",
								"bbp.limit",
								"bbp.cycles",
								"bbp.resourceId",
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
							.where("bbp.buildingBaseId", "=", id)
							.orderBy("bb.name", "asc"),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							resourceId: z.string().min(1),
							amount: z.number().nonnegative(),
							limit: z.number().nonnegative(),
							cycles: z.number().nonnegative(),
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
		const { filter, cursor, selection } = Route.useSearch();
		const { id } = Route.useParams();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<Building_Base_Production_Table
					buildingBaseId={id}
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
