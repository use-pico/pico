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
import { Building_Base_Inventory_Table } from "~/app/derivean/root/building/Building_Base_Inventory_Table";
import { Building_Base_Inventory_Schema } from "~/app/derivean/schema/building/Building_Base_Inventory_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/inventory",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(Building_Base_Inventory_Schema),
	),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({
		context: { queryClient, kysely },
		deps: { filter, cursor },
		params: { id },
	}) {
		return queryClient.ensureQueryData({
			queryKey: [
				"Building_Base_Inventory",
				"list-count",
				id,
				{ filter, cursor },
			],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Building_Base_Inventory as bbi")
							.innerJoin("Inventory as i", "i.id", "bbi.inventoryId")
							.innerJoin("Resource as r", "r.id", "i.resourceId")
							.select([
								"bbi.id",
								"bbi.inventoryId",
								"i.amount",
								"i.limit",
								"r.name",
							])
							.where("bbi.buildingBaseId", "=", id)
							.orderBy("r.name"),
						output: z.object({
							id: z.string().min(1),
							inventoryId: z.string().min(1),
							name: z.string().min(1),
							amount: z.number().nonnegative(),
							limit: z.number().nonnegative(),
						}),
						filter,
						cursor,
					});
				});
			},
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
				<Building_Base_Inventory_Table
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
