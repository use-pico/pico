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
import { BaseBuildingProductionSchema } from "~/app/derivean/building/base/production/BaseBuildingProductionSchema";
import { BaseBuildingProductionSource } from "~/app/derivean/building/base/production/BaseBuildingProductionSource";
import { BaseBuildingProductionTable } from "~/app/derivean/building/base/production/BaseBuildingProductionTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/base/$id/production/",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(BaseBuildingProductionSchema),
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
		params: { id },
	}) {
		return kysely.transaction().execute(async (tx) => {
			return withListCountLoader({
				tx,
				queryClient,
				source: BaseBuildingProductionSource,
				filter,
				cursor,
				sort,
				where: {
					baseBuildingId: id,
				},
			});
		});
	},
	component: () => {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const { id } = Route.useParams();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BaseBuildingProductionTable
					baseBuildingId={id}
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
