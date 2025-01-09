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
    navigateOnSelection,
    Tx,
    withListCount,
    withSourceSearchSchema,
} from "@use-pico/client";
import { withBoolSchema } from "@use-pico/common";
import { z } from "zod";
import { ResourceRequirementSchema } from "~/app/derivean/resource/requirement/ResourceRequirementSchema";
import { ResourceRequirementTable } from "~/app/derivean/root/resource/requirement/ResourceRequirementTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/requirements",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(ResourceRequirementSchema),
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
			queryKey: ["Resource_Requirement", "list-count", id, { filter, cursor }],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Resource_Requirement as rr")
							.innerJoin("Resource as rq", "rq.id", "rr.requirementId")
							.select([
								"rr.id",
								"rq.name",
								"rr.amount",
								"rr.passive",
								"rr.resourceId",
								"rr.requirementId",
							])
							.where(
								"rr.resourceId",
								"=",
								tx
									.selectFrom("Building_Base as bb")
									.select("bb.resourceId")
									.where("bb.id", "=", id),
							),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							resourceId: z.string().min(1),
							requirementId: z.string().min(1),
							amount: z.number().nonnegative(),
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
			from: "/$locale/apps/derivean/root/building/base/$id",
		});
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<ResourceRequirementTable
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
