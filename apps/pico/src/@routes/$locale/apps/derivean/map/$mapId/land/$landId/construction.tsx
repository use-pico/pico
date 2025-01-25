import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { withBoolSchema } from "@use-pico/common";
import { z } from "zod";
import { ConstructionPanel } from "~/app/derivean/game/GameMap2/Construction/ConstructionPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/land/$landId/construction",
)({
	async loader({
		context: { queryClient, kysely, session },
		params: { mapId, landId },
	}) {
		const user = await session();

		return {
			user,
			blueprints: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "land", landId, "construction", "list"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom(
									tx
										.selectFrom("Blueprint as bl")
										.select([
											"bl.id",
											"bl.name",
											"bl.sort",
											"bl.cycles",
											(eb) =>
												eb
													.selectFrom("Building as bg")
													.select((eb) =>
														eb.fn.count<number>("bg.id").as("count"),
													)
													.whereRef("bg.blueprintId", "=", "bl.id")
													.where("bg.userId", "=", user.id)
													.where("bg.landId", "is", landId)
													.as("count"),
											(eb) => {
												return eb
													.case()
													.when(
														eb.not(
															eb.exists(
																eb
																	.selectFrom("Blueprint_Dependency as bd")
																	.select(eb.lit(1).as("one"))
																	.whereRef("bd.blueprintId", "=", "bl.id")
																	.where((eb) =>
																		eb.not(
																			eb.exists(
																				eb
																					.selectFrom("Building as b")
																					.innerJoin(
																						"Land as l",
																						"l.id",
																						"b.landId",
																					)
																					.select(eb.lit(1).as("one"))
																					.where("b.constructionId", "is", null)
																					.where("b.userId", "=", user.id)
																					.where("l.mapId", "=", mapId)
																					.whereRef(
																						"b.blueprintId",
																						"=",
																						"bd.dependencyId",
																					),
																			),
																		),
																	),
															),
														),
													)
													.then(eb.lit(true))
													.else(eb.lit(false))
													.end()
													.as("withAvailableBuildings");
											},
										])
										.where(
											"bl.id",
											"not in",
											tx
												.selectFrom("Blueprint_Conflict as bc")
												.select("bc.conflictId")
												.where(
													"bc.blueprintId",
													"in",
													tx
														.selectFrom("Building as bg")
														.innerJoin("Land as l", "l.id", "bg.landId")
														.select("bg.blueprintId")
														.where("bg.userId", "=", user.id)
														.where("l.mapId", "=", mapId),
												),
										)
										.as("blueprint"),
								)
								.selectAll()
								.where("withAvailableBuildings", "=", true)
								.orderBy("blueprint.sort", "asc"),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								count: z.number().int().nonnegative(),
								cycles: z.number().int().nonnegative(),
								sort: z.number().int().nonnegative(),
								withAvailableBuildings: withBoolSchema(),
							}),
						});
					});
				},
			}),
		};
	},
	component() {
		const { user, blueprints } = Route.useLoaderData();
		const { land } = useLoaderData({
			from: "/$locale/apps/derivean/map/$mapId/land/$landId",
		});

		return (
			<ConstructionPanel
				userId={user.id}
				land={land}
				blueprints={blueprints}
			/>
		);
	},
});
