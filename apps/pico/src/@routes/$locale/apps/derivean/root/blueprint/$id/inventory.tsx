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
import { BlueprintInventoryTable } from "~/app/derivean/root/BlueprintInventoryTable";
import { BlueprintInventorySchema } from "~/app/derivean/schema/BlueprintInventorySchema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/$id/inventory",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(BlueprintInventorySchema),
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
			queryKey: ["Blueprint_Inventory", "list-count", id, { filter, cursor }],
			async queryFn() {
				return kysely.transaction().execute((tx) => {
					return withListCount({
						select: tx
							.selectFrom("Blueprint_Inventory as bi")
							.innerJoin("Inventory as i", "i.id", "bi.inventoryId")
							.innerJoin("Resource as r", "r.id", "i.resourceId")
							.select([
								"bi.id",
								"r.name",
								"i.amount",
								"i.limit",
								"i.resourceId",
								"bi.blueprintId",
								"bi.inventoryId",
							])
							.where("bi.blueprintId", "=", id)
							.orderBy("r.name", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.id) {
								$select = $select.where("bi.id", "=", where.id);
							}
							if (where?.idIn) {
								$select = $select.where("bi.id", "in", where.idIn);
							}

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`.toLowerCase();

								$select = $select.where((qb) => {
									return qb.or([
										qb("bi.id", "like", `%${fulltext}%`),
										qb("r.id", "like", `%${fulltext}%`),
										qb("r.name", "like", `%${fulltext}%`),
										qb(
											"r.id",
											"in",
											qb
												.selectFrom("Resource_Tag as rt")
												.innerJoin("Tag as t", "t.id", "rt.tagId")
												.select("rt.resourceId")
												.where((eb) => {
													return eb.or([
														eb("t.code", "like", fulltext),
														eb("t.label", "like", fulltext),
														eb("t.group", "like", fulltext),
													]);
												}),
										),
									]);
								});
							}

							return $select;
						},
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							resourceId: z.string().min(1),
							blueprintId: z.string().min(1),
							inventoryId: z.string().min(1),
							amount: z.number().nonnegative(),
							limit: z.number().int().nonnegative(),
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
				<BlueprintInventoryTable
					blueprintId={id}
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
