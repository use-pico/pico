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
import { BuildingBaseProductionSchema } from "~/app/derivean/building/base/production/BuildingBaseProductionSchema";
import { BuildingBaseProductionTable } from "~/app/derivean/root/building/base/production/BuildingBaseProductionTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/production",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(BuildingBaseProductionSchema),
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
							])
							.where(
								"rp.id",
								"in",
								tx
									.selectFrom("Building_Base_Production as bbp")
									.innerJoin(
										"Building_Base as bb",
										"bb.id",
										"bbp.buildingBaseId",
									)
									.select("bbp.resourceProductionId")
									.where("bbp.buildingBaseId", "=", id),
							),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							resourceId: z.string().min(1),
							amount: z.number().nonnegative(),
							limit: z.number().nonnegative(),
							cycles: z.number().nonnegative(),
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
				<BuildingBaseProductionTable
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
