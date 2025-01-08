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
import { BuildingBaseInventorySchema } from "~/app/derivean/building/base/inventory/BuildingBaseInventorySchema";
import { BuildingBaseInventoryTable } from "~/app/derivean/root/building/base/inventory/BuildingBaseInventoryTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/inventory",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(BuildingBaseInventorySchema),
	),
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
		return kysely.transaction().execute(async (tx) => {
			return withListCount({
				select: tx
					.selectFrom("Inventory as i")
					.innerJoin("Resource as r", "r.id", "i.resourceId")
					.select(["i.id", "i.amount", "i.limit", "r.name"])
					.where(
						"i.id",
						"in",
						tx
							.selectFrom("Building_Base_Inventory as bbi")
							.select("bbi.inventoryId")
							.where("bbi.buildingBaseId", "=", id),
					),
				filter,
				cursor,
				output: z.object({
					id: z.string().min(1),
					name: z.string().min(1),
					amount: z.number().nonnegative(),
					limit: z.number().nonnegative(),
				}),
			});
		});
	},
	component() {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const { id } = Route.useParams();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BuildingBaseInventoryTable
					buildingBaseId={id}
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
						textTotal: <Tx label={"Number of requirements (label)"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});