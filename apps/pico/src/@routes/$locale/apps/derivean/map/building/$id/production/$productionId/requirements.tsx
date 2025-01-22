import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { withBoolSchema } from "@use-pico/common";
import { z } from "zod";
import { RequirementPanel } from "~/app/derivean/game/GameMap2/Production/Requirement/RequirementPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/building/$id/production/$productionId/requirements",
)({
	async loader({ context: { queryClient, kysely }, params: { productionId } }) {
		return {
			requirement: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "building", "production", productionId],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Blueprint_Production_Requirement as bpr")
								.innerJoin("Resource as r", "r.id", "bpr.resourceId")
								.select(["bpr.id", "r.name", "bpr.amount", "bpr.passive"])
								.where("bpr.blueprintProductionId", "=", productionId),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								amount: z.number().nonnegative(),
								passive: withBoolSchema(),
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
		const { requirement } = Route.useLoaderData();

		return (
			<RequirementPanel
				building={building}
				requirement={requirement}
			/>
		);
	},
});
