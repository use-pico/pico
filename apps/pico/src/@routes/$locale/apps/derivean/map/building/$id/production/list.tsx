import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { ProductionPanel } from "~/app/derivean/game/GameMap2/Production/ProductionPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/building/$id/production/list",
)({
	async loader({ context: { queryClient, kysely, session }, params: { id } }) {
		return {
			production: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "building", "production", id],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Blueprint_Production as bp")
								.innerJoin("Resource as r", "r.id", "bp.resourceId")
								.select(["bp.id", "r.name", "bp.amount", "bp.cycles"])
								.where(
									"bp.blueprintId",
									"=",
									tx
										.selectFrom("Building as b")
										.select("b.blueprintId")
										.where("b.id", "=", id),
								),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								amount: z.number().nonnegative(),
								cycles: z.number().int().nonnegative(),
							}),
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
		const { production } = Route.useLoaderData();

		return (
			<ProductionPanel
				building={building}
				production={production}
			/>
		);
	},
});
