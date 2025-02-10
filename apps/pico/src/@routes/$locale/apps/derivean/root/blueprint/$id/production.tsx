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
import { BlueprintProductionDependencySchema } from "~/app/derivean/schema/BlueprintProductionDependencySchema";
import { BlueprintProductionRequirementSchema } from "~/app/derivean/schema/BlueprintProductionRequirementSchema";
import { BlueprintProductionResourceSchema } from "~/app/derivean/schema/BlueprintProductionResourceSchema";
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
								(eb) =>
									eb
										.selectFrom("Blueprint_Production_Resource as bpr")
										.innerJoin("Resource as r", "r.id", "bpr.resourceId")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                'id', ${eb.ref("bpr.id")},
                                                'amount', ${eb.ref("bpr.amount")},
                                                'blueprintProductionId', ${eb.ref("bpr.blueprintProductionId")},
                                                'resourceId', ${eb.ref("bpr.resourceId")},
                                                'name', ${eb.ref("r.name")}
                                            ))`.as("requirements");
										})
										.whereRef("bpr.blueprintProductionId", "=", "bp.id")
										.as("resources"),
								(eb) =>
									eb
										.selectFrom("Blueprint_Production_Dependency as bpd")
										.innerJoin("Blueprint as bl2", "bl2.id", "bpd.blueprintId")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                'id', ${eb.ref("bpd.id")},
                                                'blueprintProductionId', ${eb.ref("bpd.blueprintProductionId")},
                                                'blueprintId', ${eb.ref("bpd.blueprintId")},
                                                'name', ${eb.ref("bl2.name")}
                                            ))`.as("requirements");
										})
										.whereRef("bpd.blueprintProductionId", "=", "bp.id")
										.as("dependencies"),
							])
							.where("bp.blueprintId", "=", id)
							.orderBy("r.name", "asc"),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							blueprintId: z.string().min(1),
							resourceId: z.string().min(1),
							amount: z.number().nonnegative(),
							cycles: z.number().nonnegative(),
							requirements: withJsonArraySchema(
								BlueprintProductionRequirementSchema.entity.merge(
									z.object({
										name: z.string().min(1),
									}),
								),
							),
							resources: withJsonArraySchema(
								BlueprintProductionResourceSchema.entity.merge(
									z.object({
										name: z.string().min(1),
									}),
								),
							),
							dependencies: withJsonArraySchema(
								BlueprintProductionDependencySchema.entity.merge(
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
						set: navigateOnFulltext(filter?.fulltext, navigate),
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
