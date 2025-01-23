import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { InventoryPanel } from "~/app/derivean/game/GameMap2/Inventory/InventoryPanel";

export const Route = createFileRoute("/$locale/apps/derivean/map/inventory")({
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
	}) {
		const user = await session();

		return {
			inventory: await queryClient.ensureQueryData({
				queryKey: ["User_Inventory", user.id, { fulltext }],
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
										.selectFrom("User_Inventory as ui")
										.select("ui.inventoryId")
										.where("ui.userId", "=", user.id),
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
		const { fulltext } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { inventory } = Route.useLoaderData();

		return (
			<InventoryPanel
				inventory={inventory as any}
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
