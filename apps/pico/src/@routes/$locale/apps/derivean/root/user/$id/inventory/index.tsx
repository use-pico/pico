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
import { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import { InventorySource } from "~/app/derivean/inventory/InventorySource";
import { InventoryTable } from "~/app/derivean/root/inventory/InventoryTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/user/$id/inventory/",
)({
	validateSearch: zodValidator(withSourceSearchSchema(InventorySchema)),
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
		return kysely.transaction().execute((tx) => {
			return withListCountLoader({
				tx,
				queryClient,
				source: InventorySource,
				filter,
				cursor,
				sort: sort || [
					{ name: "resource", sort: "asc" },
					{ name: "amount", sort: "desc" },
				],
			});
		});
	},
	component() {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { id } = Route.useParams();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<InventoryTable
					userId={id}
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
