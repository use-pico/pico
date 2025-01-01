import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { withSearchSchema } from "@use-pico/common";
import { BaseBuildingList } from "~/app/derivean/building/base/BaseBuildingList";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";

const SearchSchema = withSearchSchema({ filter: BaseBuildingSchema.filter });

const loader = BaseBuildingRepository.withRouteListLoader();

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/list/",
)({
	component() {
		const { data, count } = Route.useLoaderData();

		return (
			<div>
				<BaseBuildingList entities={data} />
			</div>
		);
	},
	validateSearch: zodValidator(SearchSchema),
	loaderDeps({ search: { global, filter, cursor } }) {
		return {
			global,
			filter,
			cursor,
		};
	},
	async loader({ context, deps: { filter, ...deps }, params: { id } }) {
		return loader({
			context,
			deps: {
				...deps,
				filter: {
					...filter,
				},
			},
		});
	},
});
