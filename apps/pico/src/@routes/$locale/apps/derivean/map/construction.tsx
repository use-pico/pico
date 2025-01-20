import { createFileRoute } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { Construction } from "~/app/derivean/game/GameMap2/Construction/Construction";
import { ConstructionSchema } from "~/app/derivean/game/GameMap2/schema/ConstructionSchema";

export const Route = createFileRoute("/$locale/apps/derivean/map/construction")(
	{
		async loader({ context: { queryClient, kysely, session } }) {
			const user = await session();

			return {
				construction: await queryClient.ensureQueryData({
					queryKey: ["Blueprint", user.id],
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
								output: ConstructionSchema,
							});
						});
					},
				}),
			};
		},
		component() {
			const { construction } = Route.useLoaderData();

			return <Construction construction={construction} />;
		},
	},
);
