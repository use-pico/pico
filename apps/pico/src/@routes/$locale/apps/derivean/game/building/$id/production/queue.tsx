import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFilter,
    navigateOnFulltext,
    Tx,
    withListCountLoader,
    withSourceSearchSchema,
} from "@use-pico/client";
import { BuildingProductionQueueSchema } from "~/app/derivean/building/production/BuildingProductionQueueSchema";
import { BuildingProductionQueueSource } from "~/app/derivean/building/production/BuildingProductionQueueSource";
import { ProductionQueueTable } from "~/app/derivean/game/building/production/ProductionQueueTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/$id/production/queue",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(BuildingProductionQueueSchema),
	),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({
		context: { queryClient, kysely, session },
		deps: { filter, cursor, sort },
		params: { id },
	}) {
		const user = await session();

		return kysely.transaction().execute(async (tx) => {
			return withListCountLoader({
				tx,
				queryClient,
				source: BuildingProductionQueueSource,
				filter,
				cursor,
				sort,
				where: {
					userId: user.id,
					buildingId: id,
				},
			});
		});
	},
	component() {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<ProductionQueueTable
					table={{
						data,
						filter: {
							value: filter,
							set: navigateOnFilter(navigate),
						},
						hidden: ["building.baseBuilding.name"],
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
