import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { withListLoader, withSourceSearchSchema } from "@use-pico/client";
import { BaseBuildingList } from "~/app/derivean/building/base/BaseBuildingList";
import { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { BaseBuildingSource } from "~/app/derivean/building/base/BaseBuildingSource";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/base/list/",
)({
	validateSearch: zodValidator(withSourceSearchSchema(BaseBuildingSchema)),
	loaderDeps({ search: { filter, cursor } }) {
		return {
			filter,
			cursor,
		};
	},
	async loader({ context: { queryClient, kysely }, deps: { filter, cursor } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				data: await withListLoader({
					tx,
					queryClient,
					source: BaseBuildingSource,
					filter,
					cursor,
				}),
			};
		});
	},
	component() {
		const { data } = Route.useLoaderData();
		const { inventory, session } = useLoaderData({
			from: "/$locale/apps/derivean/game",
		});

		return (
			<div>
				<BaseBuildingList
					userId={session.id}
					inventory={inventory}
					entities={data}
				/>
			</div>
		);
	},
});
