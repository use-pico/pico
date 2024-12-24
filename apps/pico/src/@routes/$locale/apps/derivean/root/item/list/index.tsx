import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { withSearchSchema } from "@use-pico/common";
import { ItemFilterSchema } from "~/app/derivean/item/schema/ItemFilterSchema";
import { withItemCount } from "~/app/derivean/item/withItemCount";
import { withItemListLoader } from "~/app/derivean/item/withItemListLoader";

const SearchSchema = withSearchSchema({
	filter: ItemFilterSchema,
});

export const Route = createFileRoute("/$locale/apps/derivean/root/item/list/")({
	component: () => {
		//

		return "nope";
	},
	validateSearch: zodValidator(SearchSchema),
	loaderDeps: ({ search: { global, filter, cursor } }) => ({
		global,
		filter,
		cursor,
	}),
	loader: async ({
		context: { queryClient },
		deps: { global, filter, cursor },
	}) => {
		return {
			blueprints: await withItemListLoader({
				queryClient,
				filter: {
					...global,
					...filter,
				},
				cursor,
			}),
			count: await withItemCount({
				queryClient,
				filter: { ...global, ...filter },
			}),
		};
	},
});
