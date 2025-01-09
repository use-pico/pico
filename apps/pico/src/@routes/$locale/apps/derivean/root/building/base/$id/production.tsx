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
import { genId, withJsonArraySchema } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { ResourceProductionRequirementSchema } from "~/app/derivean/resource/production/requirement/ResourceProductionRequirementSchema";
import { ResourceProductionSchema } from "~/app/derivean/resource/production/ResourceProductionSchema";
import { ResourceProductionTable } from "~/app/derivean/root/resource/production/ResourceProductionTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/production",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(ResourceProductionSchema),
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
							.selectFrom("Resource_Production as rp")
							.innerJoin("Resource as r", "r.id", "rp.resourceId")
							.select([
								"rp.id",
								"r.name",
								"rp.amount",
								"rp.limit",
								"rp.cycles",
								"rp.resourceId",
								(eb) =>
									eb
										.selectFrom("Resource_Production_Requirement as rpr")
										.innerJoin("Resource as rq", "rq.id", "rpr.requirementId")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                'id', ${eb.ref("rpr.id")},
                                                'amount', ${eb.ref("rpr.amount")},
                                                'level', ${eb.ref("rpr.level")},
                                                'passive', ${eb.ref("rpr.passive")},
                                                'requirementId', ${eb.ref("rpr.requirementId")},
                                                'resourceId', ${eb.ref("rpr.resourceId")},
                                                'name', ${eb.ref("rq.name")}
                                            ))`.as("requirements");
										})
										.where("rpr.resourceId", "=", eb.ref("rp.resourceId"))
										.as("requirements"),
							]),
						// .where(
						// 	"rp.resourceId",
						// 	"in",
						// 	tx
						// 		.selectFrom("Building_Base_Production as bbp")
						// 		.innerJoin(
						// 			"Building_Base as bb",
						// 			"bb.id",
						// 			"bbp.buildingBaseId",
						// 		)
						// 		.select("bbp.")
						// 		.where("bbp.buildingBaseId", "=", id),
						// ),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							requirementId: z.string().min(1),
							resourceId: z.string().min(1),
							amount: z.number().nonnegative(),
							limit: z.number().nonnegative(),
							level: z.number().nonnegative(),
							cycles: z.number().nonnegative(),
							requirements: withJsonArraySchema(
								ResourceProductionRequirementSchema.entity.merge(
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
				<ResourceProductionTable
					onCreate={async ({ tx, entity: { resourceId } }) => {
						return tx
							.insertInto("Building_Base_Production")
							.values({
								id: genId(),
								buildingBaseId: id,
								resourceId,
							})
							.execute();
					}}
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
