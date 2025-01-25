import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { withBoolSchema } from "@use-pico/common";
import { z } from "zod";
import { RequirementPanel } from "~/app/derivean/game/GameMap2/Blueprint/Requirement/RequirementPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/blueprint/$blueprintId/requirements",
)({
	async loader({ context: { queryClient, kysely }, params: { blueprintId } }) {
		return {
			requirement: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "blueprint", blueprintId, "requirements"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Blueprint_Requirement as br")
								.innerJoin("Resource as r", "r.id", "br.resourceId")
								.select(["br.id", "r.name", "br.amount", "br.passive"])
								.where("br.blueprintId", "=", blueprintId),
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
		const { blueprint } = useLoaderData({
			from: "/$locale/apps/derivean/map/$mapId/blueprint/$blueprintId",
		});
		const { requirement } = Route.useLoaderData();

		return (
			<RequirementPanel
				blueprint={blueprint}
				requirement={requirement}
			/>
		);
	},
});
