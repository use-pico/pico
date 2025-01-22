import { createFileRoute } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { ConstructionPanel } from "~/app/derivean/game/GameMap2/Construction/ConstructionPanel";

export const Route = createFileRoute("/$locale/apps/derivean/map/construction")(
	{
		async loader({ context: { queryClient, kysely, session } }) {
			const user = await session();

			return {
				user,
				blueprints: await queryClient.ensureQueryData({
					queryKey: ["GameMap", user.id],
					async queryFn() {
						return kysely.transaction().execute(async (tx) => {
							return withList({
								select: tx
									.selectFrom("Blueprint as bl")
									.select([
										"bl.id",
										"bl.name",
										(eb) =>
											eb
												.selectFrom("Building as bg")
												.select((eb) =>
													eb.fn.count<number>("bg.id").as("count"),
												)
												.whereRef("bg.blueprintId", "=", "bl.id")
												.where("bg.userId", "=", user.id)
												.as("count"),
									])
									.orderBy("bl.sort", "asc"),
								output: z.object({
									id: z.string().min(1),
									name: z.string().min(1),
									count: z.number().int().nonnegative(),
								}),
							});
						});
					},
				}),
			};
		},
		component() {
			const { user, blueprints } = Route.useLoaderData();

			return (
				<ConstructionPanel
					userId={user.id}
					blueprints={blueprints}
				/>
			);
		},
	},
);
