import { createFileRoute } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { withBoolSchema } from "@use-pico/common";
import { z } from "zod";
import { RequirementPanel } from "~/app/derivean/game/GameMap2/Construction/Requirement/RequirementPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/building/$id/construction/requirements",
)({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return {
			requirement: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "building", "construction", "requirement", id],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Blueprint_Requirement as br")
								.innerJoin("Building as bg", "bg.blueprintId", "br.blueprintId")
								.innerJoin("Resource as r", "r.id", "br.resourceId")
								.leftJoin("Building_Inventory as bi", "bi.buildingId", "bg.id")
								.leftJoin("Inventory as i", "i.id", "bi.inventoryId")
								.select([
									"br.id",
									"r.name",
									"br.amount",
									"br.passive",
									"i.amount as available",
								])
								.where("bg.id", "=", id)
								.orderBy("r.name", "asc"),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								amount: z.number().nonnegative(),
								available: z.number().nonnegative().nullish(),
								passive: withBoolSchema(),
							}),
						});
					});
				},
			}),
		};
	},
	component() {
		const { requirement } = Route.useLoaderData();

		return <RequirementPanel requirement={requirement} />;
	},
});
