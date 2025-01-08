import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSelection,
	Tx,
	withListCount,
	withSourceSearchSchema,
} from "@use-pico/client";
import { z } from "zod";
import { DefaultInventorySchema } from "~/app/derivean/inventory/default/DefaultInventorySchema";
import { DefaultInventoryTable } from "~/app/derivean/root/inventory/default/DefaultInventoryTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/inventory/default",
)({
	validateSearch: zodValidator(withSourceSearchSchema(DefaultInventorySchema)),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({ context: { kysely }, deps: { filter, cursor } }) {
		return kysely.transaction().execute((tx) => {
			return withListCount({
				select: tx
					.selectFrom("Default_Inventory as di")
					.innerJoin("Resource as r", "r.id", "di.resourceId")
					.select([
						"di.id",
						"r.name",
						"di.amount",
						"di.limit",
						"di.resourceId",
					]),
				output: z.object({
					id: z.string().min(1),
					name: z.string().min(1),
					resourceId: z.string().min(1),
					amount: z.number().nonnegative(),
					limit: z.number().int().nonnegative(),
				}),
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
