import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFilter,
    navigateOnFulltext,
    Tx,
    withListCount,
    withSourceSearchSchema,
} from "@use-pico/client";
import { z } from "zod";
import { InventoryTable } from "~/app/derivean/game/InventoryTable";
import { InventorySchema } from "~/app/derivean/schema/InventorySchema";

export const Route = createFileRoute("/$locale/apps/derivean/game/inventory")({
	validateSearch: zodValidator(withSourceSearchSchema(InventorySchema)),
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
					)
					.orderBy("r.name"),
				query({ select, where }) {
					let $select = select;

					if (where?.id) {
						$select = $select.where("i.id", "=", where.id);
					}
					if (where?.idIn) {
						$select = $select.where("i.id", "in", where.idIn);
					}

					if (where?.fulltext) {
						const fulltext = `%${where.fulltext}%`.toLowerCase();

						$select = $select.where((qb) => {
							return qb.or([
								qb("i.id", "like", `%${fulltext}%`),
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
					limit: z.number().nonnegative(),
				}),
				filter,
				cursor,
			});
		});
	},
	component() {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<InventoryTable
					table={{
						data,
						filter: {
							value: filter,
							set: navigateOnFilter(navigate),
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
