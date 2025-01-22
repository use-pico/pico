import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { BackIcon, LinkTo, withList } from "@use-pico/client";
import { z } from "zod";
import { InventoryPanel } from "~/app/derivean/game/GameMap2/Inventory/InventoryPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/building/$id/inventory",
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
		params: { id },
	}) {
		return {
			inventory: await queryClient.ensureQueryData({
				queryKey: ["GameMap", id, { fulltext }],
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
										.where("bi.buildingId", "=", id),
								)
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
			from: "/$locale/apps/derivean/map/building/$id",
		});
		const { fulltext } = Route.useSearch();
		const { locale } = Route.useParams();
		const navigate = Route.useNavigate();
		const { inventory } = Route.useLoaderData();

		return (
			<InventoryPanel
				inventory={inventory}
				textSubTitle={
					<>
						<LinkTo
							icon={BackIcon}
							to={"/$locale/apps/derivean/map/building/$id/view"}
							params={{ locale, id: building.id }}
						/>
						<LinkTo
							to={"/$locale/apps/derivean/map/building/$id/inventory"}
							params={{ locale, id: building.id }}
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
