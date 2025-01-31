import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { InventoryPanel } from "~/app/derivean/game/GameMap2/Inventory/InventoryPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/building/$buildingId/inventory",
)({
	validateSearch: zodValidator(
		z.object({
			fulltext: z.string().optional(),
		}),
	),
	loaderDeps({ search: { fulltext } }) {
		return {
			fulltext,
		};
	},
	async loader({
		context: { queryClient, kysely, session },
		deps: { fulltext },
		params: { mapId, buildingId },
	}) {
		const user = await session();

		return {
			user,
			inventory: await queryClient.ensureQueryData({
				queryKey: [
					"GameMap",
					mapId,
					"building",
					buildingId,
					"inventory",
					"storage",
					{ fulltext },
				],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Inventory as i")
								.innerJoin("Building_Inventory as bi", (eb) => {
									return eb
										.on("bi.buildingId", "=", buildingId)
										.onRef("bi.inventoryId", "=", "i.id");
								})
								.innerJoin("Resource as r", "r.id", "i.resourceId")
								.leftJoin("Supply as s", (eb) => {
									return eb
										.onRef("s.resourceId", "=", "i.resourceId")
										.on("s.buildingId", "=", buildingId);
								})
								.leftJoin("Demand as d", (eb) => {
									return eb
										.onRef("d.resourceId", "=", "i.resourceId")
										.on("d.buildingId", "=", buildingId);
								})
								.select([
									"i.id",
									"i.amount",
									"i.limit",
									"r.name",
									"bi.buildingId",
									"i.resourceId",
									"s.id as supplyId",
									"d.id as demandId",
								])
								.where("i.type", "in", ["storage"])
								.orderBy("r.name"),
							query({ select, where }) {
								let $select = select;

								if (where?.fulltext) {
									const fulltext = `%${where.fulltext}%`.toLowerCase();

									$select = $select.where((eb) => {
										return eb.or([eb("r.name", "like", fulltext)]);
									});
								}

								return $select;
							},
							output: z.object({
								id: z.string().min(1),
								buildingId: z.string().min(1),
								resourceId: z.string().min(1),
								amount: z.number().nonnegative(),
								limit: z.number().nonnegative(),
								name: z.string().min(1),
								supplyId: z.string().nullish(),
								demandId: z.string().nullish(),
							}),
							filter: {
								fulltext,
							},
						});
					});
				},
			}),
		};
	},
	component() {
		const { building } = useLoaderData({
			from: "/$locale/apps/derivean/map/$mapId/building/$buildingId",
		});
		const { fulltext } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { user, inventory } = Route.useLoaderData();

		return (
			<InventoryPanel
				building={building}
				userId={user.id}
				inventory={inventory}
				fulltextProps={{
					value: fulltext,
					onFulltext(value) {
						navigate({ search: { fulltext: value } });
					},
				}}
			/>
		);
	},
});
