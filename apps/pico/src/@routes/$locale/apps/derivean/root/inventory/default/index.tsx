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
import { DefaultInventorySchema } from "~/app/derivean/inventory/default/DefaultInventorySchema";
import { DefaultInventorySource } from "~/app/derivean/inventory/default/DefaultInventorySource";
import { DefaultInventoryTable } from "~/app/derivean/inventory/default/DefaultInventoryTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/inventory/default/",
)({
	validateSearch: zodValidator(withSourceSearchSchema(DefaultInventorySchema)),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({ context: { queryClient, kysely }, deps: { filter, cursor } }) {
		return kysely.transaction().execute((tx) => {
			return withListCountLoader({
				tx,
				queryClient,
				source: DefaultInventorySource,
				filter,
				cursor,
			});
		});
	},
	component() {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<DefaultInventoryTable
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
