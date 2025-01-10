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
import { Inventory_Table } from "~/app/derivean/game/inventory/Inventory_Table";
import { Inventory_Schema } from "~/app/derivean/schema/inventory/Inventory_Schema";

export const Route = createFileRoute("/$locale/apps/derivean/game/inventory")({
	validateSearch: zodValidator(withSourceSearchSchema(Inventory_Schema)),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({ context: { kysely, session }, deps: { filter, cursor } }) {
		const user = await session();

		return kysely.transaction().execute((tx) => {
			return withListCount({
				select: tx
					.selectFrom("Inventory as i")
					.innerJoin("Resource as r", "r.id", "i.resourceId")
					.selectAll("i")
					.select("r.name")
					.where(
						"i.id",
						"in",
						tx
							.selectFrom("User_Inventory as ui")
							.select("ui.inventoryId")
							.where("ui.userId", "=", user.id),
					),
				output: z.object({
					id: z.string().min(1),
					name: z.string().min(1),
					resourceId: z.string().min(1),
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
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<Inventory_Table
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
