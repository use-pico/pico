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
import { DefaultInventoryTable } from "~/app/derivean/root/DefaultInventoryTable";
import { DefaultInventorySchema } from "~/app/derivean/schema/DefaultInventorySchema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/default/inventory",
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
		return queryClient.ensureQueryData({
			queryKey: ["Default_Inventory", "list-count", { filter, cursor }],
			async queryFn() {
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
							])
							.orderBy("r.name", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.id) {
								$select = $select.where("di.id", "=", where.id);
							}
							if (where?.idIn) {
								$select = $select.where("di.id", "in", where.idIn);
							}

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`.toLowerCase();

								$select = $select.where((qb) => {
									return qb.or([
										qb("di.id", "like", `%${fulltext}%`),
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