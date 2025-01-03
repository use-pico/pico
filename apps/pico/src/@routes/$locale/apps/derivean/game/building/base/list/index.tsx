import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { withSearchSchema } from "@use-pico/common";
import { BaseBuildingList } from "~/app/derivean/building/base/BaseBuildingList";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { kysely } from "~/app/derivean/db/db";

const SearchSchema = withSearchSchema({ filter: BaseBuildingSchema.filter });

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/base/list/",
)({
	validateSearch: zodValidator(SearchSchema),
	loaderDeps({ search: { global, filter, cursor } }) {
		return {
			global,
			filter,
			cursor,
		};
	},
	loader: BaseBuildingRepository(kysely).withRouteListLoader(),
	component() {
		const { data } = Route.useLoaderData();
		const { resources } = useLoaderData({
			from: "/$locale/apps/derivean/game",
		});

		return (
			<div>
				<BaseBuildingList
					resources={resources}
					entities={data}
				/>
			</div>
		);
	},
});
