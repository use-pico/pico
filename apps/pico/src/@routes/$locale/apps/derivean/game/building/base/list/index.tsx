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
    Tx,
    withListCountLoader,
    withSourceSearchSchema,
} from "@use-pico/client";
import { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import { BuildingBaseSource } from "~/app/derivean/building/base/BuildingBaseSource";
import { BuildingBaseTable } from "~/app/derivean/game/building/base/BuildingBaseTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/base/list/",
)({
	validateSearch: zodValidator(withSourceSearchSchema(BuildingBaseSchema)),
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
	}) {
		return kysely.transaction().execute(async (tx) => {
			return withListCountLoader({
				tx,
				queryClient,
				source: BuildingBaseSource,
				filter,
				cursor,
				sort: sort || [{ name: "name", sort: "asc" }],
			});
		});
	},
	component() {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;
		const { inventory, session } = useLoaderData({
			from: "/$locale/apps/derivean/game",
		});

		return (
			<div className={tv.base()}>
				<BuildingBaseTable
					userId={session.id}
					inventory={inventory}
					table={{
						data,
						filter: {
							value: filter,
							set: navigateOnFilter(navigate),
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
