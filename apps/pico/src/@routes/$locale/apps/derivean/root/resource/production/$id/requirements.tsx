import {
    createFileRoute,
    useLoaderData,
    useRouteContext
} from "@tanstack/react-router";
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
import { withBoolSchema } from "@use-pico/common";
import { z } from "zod";
import { ResourceProductionRequirementSchema } from "~/app/derivean/resource/production/requirement/ResourceProductionRequirementSchema";
import { ResourceProductionRequirementTable } from "~/app/derivean/root/resource/production/requirement/ResourceProductionRequirementTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/resource/production/$id/requirements",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(ResourceProductionRequirementSchema),
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
				"Resource_Production_Requirement",
				"list-count",
				id,
				{ filter, cursor },
			],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Resource_Production_Requirement as rpr")
							.innerJoin("Resource as r", "r.id", "rpr.resourceId")
							.select([
								"rpr.id",
								"r.name",
								"rpr.amount",
								"rpr.passive",
								"rpr.level",
								"rpr.resourceId",
							])
							.where(
								"rpr.resourceId",
								"=",
								tx
									.selectFrom("Resource_Production as rp")
									.select("rp.resourceId")
									.where("rp.id", "=", id),
							),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							resourceId: z.string().min(1),
							requirementId: z.string().min(1),
							amount: z.number().nonnegative(),
							level: z.number().nonnegative(),
							passive: withBoolSchema(),
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
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/resource/production/$id",
		});
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<ResourceProductionRequirementTable
					resourceId={entity.resourceId}
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
						textTotal: <Tx label={"Number of requirements (label)"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
