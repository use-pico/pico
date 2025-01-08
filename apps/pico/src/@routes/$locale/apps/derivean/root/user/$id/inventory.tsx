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
import { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
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
		context: { kysely },
		deps: { filter, cursor },
		params: { id },
	}) {
		return kysely.transaction().execute((tx) => {
			return withListCount({
				select: tx
					.selectFrom("Inventory as i")
					.innerJoin("Resource as r", "r.id", "i.resourceId")
					.select(["i.id", "i.resourceId", "r.name", "i.amount", "i.limit"])
					.where(
						"i.id",
						"in",
						tx
							.selectFrom("User_Inventory as ui")
							.where("ui.userId", "=", id)
							.select("ui.inventoryId"),
					),
				output: z.object({
					id: z.string().min(1),
					resourceId: z.string().min(1),
					name: z.string().min(1),
					amount: z.number().nonnegative(),
					limit: z.number().nonnegative(),
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
