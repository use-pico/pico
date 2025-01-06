import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFilter,
    navigateOnFulltext,
    navigateOnSelection,
    Tx,
    withListCountLoader,
    withSourceSearchSchema,
} from "@use-pico/client";
import { BaseBuildingProductionRequirementSchema } from "~/app/derivean/building/base/production/requirement/BaseBuildingProductionRequirementSchema";
import { BaseBuildingProductionRequirementSource } from "~/app/derivean/building/base/production/requirement/BaseBuildingProductionRequirementSource";
import { BaseBuildingProductionRequirementTable } from "~/app/derivean/building/base/production/requirement/BaseBuildingProductionRequirementTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/production/$productionId/requirement/list",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(BaseBuildingProductionRequirementSchema),
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
		deps: { filter, cursor, sort },
		params: { productionId },
	}) {
		return kysely.transaction().execute(async (tx) => {
			return withListCountLoader({
				tx,
				queryClient,
				source: BaseBuildingProductionRequirementSource,
				filter,
				cursor,
				sort: sort || [{ name: "resource", sort: "asc" }],
				where: {
					baseBuildingProductionId: productionId,
				},
			});
		});
	},
	component: () => {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const { productionId } = Route.useParams();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BaseBuildingProductionRequirementTable
					baseBuildingProductionId={productionId}
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
						textTotal: <Tx label={"Number of items"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
