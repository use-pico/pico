import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { BackIcon, LinkTo, withList } from "@use-pico/client";
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
		context: { queryClient, kysely },
		deps: { fulltext },
		params: { mapId, buildingId },
	}) {
		return {
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
								.innerJoin("Resource as r", "r.id", "i.resourceId")
								.select(["i.id", "i.amount", "i.limit", "r.name"])
								.where(
									"i.id",
									"in",
									tx
										.selectFrom("Building_Inventory as bi")
										.select("bi.inventoryId")
										.where("bi.buildingId", "=", buildingId),
								)
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
								amount: z.number().nonnegative(),
								limit: z.number().nonnegative(),
								name: z.string().min(1),
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
		const { mapId, locale } = Route.useParams();
		const navigate = Route.useNavigate();
		const { inventory } = Route.useLoaderData();

		return (
			<InventoryPanel
				inventory={inventory}
				textSubTitle={
					<>
						<LinkTo
							icon={BackIcon}
							to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
							params={{ locale, mapId, buildingId: building.id }}
						/>
						<LinkTo
							to={
								"/$locale/apps/derivean/map/$mapId/building/$buildingId/inventory"
							}
							params={{ locale, mapId, buildingId: building.id }}
							search={{ zoomToId: building.id }}
						>
							{building.name}
						</LinkTo>
					</>
				}
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
