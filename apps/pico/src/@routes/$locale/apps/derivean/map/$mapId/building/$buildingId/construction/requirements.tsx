import { createFileRoute } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { withBoolSchema } from "@use-pico/common";
import { z } from "zod";
import { RequirementPanel } from "~/app/derivean/game/GameMap2/Construction/Requirement/RequirementPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/building/$buildingId/construction/requirements",
)({
	async loader({
		context: { queryClient, kysely },
		params: { mapId, buildingId },
	}) {
		return {
			requirement: await queryClient.ensureQueryData({
				queryKey: [
					"GameMap",
					mapId,
					"building",
					buildingId,
					"construction",
					"requirement",
				],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Blueprint_Requirement as br")
								.innerJoin("Building as bg", (eb) => {
									return eb
										.onRef("bg.blueprintId", "=", "br.blueprintId")
										.on("bg.id", "=", buildingId);
								})
								.innerJoin("Resource as r", "r.id", "br.resourceId")
								.select([
									"br.id",
									"r.name",
									"br.amount",
									"br.passive",
									(eb) => {
										return eb
											.selectFrom("Inventory as i")
											.select(["i.amount"])
											.where(
												"i.id",
												"in",
												tx
													.selectFrom("Building_Inventory as bi")
													.select("bi.inventoryId")
													.where("bi.buildingId", "=", buildingId),
											)
											.whereRef("i.resourceId", "=", "br.resourceId")
											.where("i.type", "=", "construction")
											.limit(1)
											.as("available");
									},
								])
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
