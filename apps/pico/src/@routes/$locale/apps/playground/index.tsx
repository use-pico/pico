import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { handleOnPage, handleOnSize, Tx } from "@use-pico/client";
import { withSearchSchema } from "@use-pico/common";
import { PlaygroundFilterSchema } from "~/app/playground/PlaygroundFilterSchema";
import { PlaygroundItems } from "~/app/playground/PlaygroundItems";
import { PlaygroundTable } from "~/app/playground/PlaygroundTable";

const SearchSchema = withSearchSchema({ filter: PlaygroundFilterSchema });

export const Route = createFileRoute("/$locale/apps/playground/")({
	component: () => {
		const { items, count } = Route.useLoaderData();
		const { global, filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();

		return (
			<div>
				<PlaygroundTable
					table={{
						data: items,
					}}
					cursor={{
						count,
						cursor,
						textTotal: <Tx label={"Number of items"} />,
						onPage: handleOnPage(navigate),
						onSize: handleOnSize(navigate),
					}}
				/>
			</div>
		);
	},
	validateSearch: zodValidator(SearchSchema),
	loaderDeps: ({ search: { global, filter, cursor } }) => ({
		global,
		filter,
		cursor,
	}),
	loader: async ({ deps: { global, filter, cursor } }) => {
		return {
			items: PlaygroundItems,
			count: {
				total: PlaygroundItems.length,
				filter: PlaygroundItems.length,
				where: PlaygroundItems.length,
			},
		};
	},
});
