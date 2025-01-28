import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { withBoolSchema } from "@use-pico/common";
import { z } from "zod";
import { ProductionPanel } from "~/app/derivean/game/GameMap2/Production/ProductionPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/building/$buildingId/production/list",
)({
	async loader({
		context: { queryClient, kysely, session },
		params: { mapId, buildingId },
	}) {
		const user = await session();

		return {
			production: await queryClient.ensureQueryData({
				queryKey: [
					"GameMap",
					mapId,
					"building",
					buildingId,
					"production",
					"list",
				],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Blueprint_Production as bp")
								.innerJoin("Resource as r", "r.id", "bp.resourceId")
								.select([
									"bp.id",
									"r.name",
									"bp.amount",
									"bp.cycles",
									(eb) => {
										return eb
											.case()
											.when(
												eb.not(
													eb.exists(
														eb
															.selectFrom(
																"Blueprint_Production_Requirement as bpr",
															)
															.select(eb.lit(1).as("one"))
															.whereRef(
																"bpr.blueprintProductionId",
																"=",
																"bp.id",
															)
															.where((eb) =>
																eb.not(
																	eb.exists(
																		eb
																			.selectFrom("Inventory as i")
																			.select(eb.lit(1).as("one"))
																			.where(
																				"i.id",
																				"in",
																				eb
																					.selectFrom("Building_Inventory")
																					.select("inventoryId")
																					.where("buildingId", "=", buildingId),
																			)
																			.where("i.type", "in", ["storage"])
																			.whereRef(
																				"i.resourceId",
																				"=",
																				"bpr.resourceId",
																			)
																			.whereRef("i.amount", ">=", "bpr.amount"),
																	),
																),
															),
													),
												),
											)
											.then(eb.lit(true))
											.else(eb.lit(false))
											.end()
											.as("withAvailableResources");
									},
								])
								.where(
									"bp.blueprintId",
									"=",
									tx
										.selectFrom("Building as b")
										.select("b.blueprintId")
										.where("b.id", "=", buildingId),
								)
								.where((eb) => {
									return eb.not(
										eb.exists(
											eb
												.selectFrom("Blueprint_Production_Dependency as bpd")
												.select("bpd.blueprintProductionId")
												.whereRef("bpd.blueprintProductionId", "=", "bp.id")
												.where((eb) => {
													return eb.not(
														eb.exists(
															eb
																.selectFrom("Building as b")
																.select("b.blueprintId")
																.where("b.userId", "=", user.id)
																.where("b.constructionId", "is", null)
																.whereRef(
																	"b.blueprintId",
																	"=",
																	"bpd.blueprintId",
																),
														),
													);
												}),
										),
									);
								})
								.where((eb) => {
									return eb.not(
										eb.exists(
											eb
												.selectFrom("Blueprint_Production_Resource as bpr")
												.select("bpr.blueprintProductionId")
												.whereRef("bpr.blueprintProductionId", "=", "bp.id")
												.where((eb) => {
													return eb.not(
														eb.exists(
															eb
																.selectFrom("Inventory as i")
																.select("i.resourceId")
																.where(
																	"i.id",
																	"in",
																	eb
																		.selectFrom("Building_Inventory")
																		.select("inventoryId")
																		.where("buildingId", "=", buildingId),
																)
																.whereRef("i.resourceId", "=", "bpr.resourceId")
																.whereRef("i.amount", ">=", "bpr.amount"),
														),
													);
												}),
										),
									);
								})
								.orderBy("r.name"),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								amount: z.number().nonnegative(),
								cycles: z.number().int().nonnegative(),
								withAvailableResources: withBoolSchema(),
							}),
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
		const { production } = Route.useLoaderData();

		return (
			<ProductionPanel
				building={building}
				production={production}
			/>
		);
	},
});
