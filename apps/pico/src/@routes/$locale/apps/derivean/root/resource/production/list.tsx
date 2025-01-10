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
import { z } from "zod";
import { ResourceProductionSchema } from "~/app/derivean/resource/production/ResourceProductionSchema";
import { ResourceProductionTable } from "~/app/derivean/root/building/Building_Base_Production_Table";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/resource/production/list",
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
	async loader({ context: { queryClient, kysely }, deps: { filter, cursor } }) {
		return queryClient.ensureQueryData({
			queryKey: ["Resource_Production", "list-count", { filter, cursor }],
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
								// (eb) =>
								// 	eb
								// 		.selectFrom("Resource_Requirement as rr")
								// 		.innerJoin("Resource as re", "re.id", "rr.requirementId")
								// 		.select((eb) => {
								// 			return sql<string>`json_group_array(json_object(
								//                                         'id', ${eb.ref("rr.id")},
								//                                         'amount', ${eb.ref("rr.amount")},
								//                                         'passive', ${eb.ref("rr.passive")},
								//                                         'requirementId', ${eb.ref("rr.requirementId")},
								//                                         'resourceId', ${eb.ref("rr.resourceId")},
								//                                         'name', ${eb.ref("re.name")}
								//                                     ))`.as(
								// 				"requirements",
								// 			);
								// 		})
								// 		.where("rr.resourceId", "=", eb.ref("rp.resourceId"))
								// 		.as("requirements"),
							]),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							resourceId: z.string().min(1),
							amount: z.number().nonnegative(),
							limit: z.number().nonnegative(),
							cycles: z.number().nonnegative(),
							// requirements: withJsonArraySchema(
							// 	ResourceProductionRequirementSchema.entity.merge(
							// 		z.object({
							// 			name: z.string().min(1),
							// 		}),
							// 	),
							// ),
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
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<ResourceProductionTable
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
