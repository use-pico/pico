import { createFileRoute } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { Construction } from "~/app/derivean/game/GameMap2/Construction/Construction";
import { BlueprintSchema } from "~/app/derivean/game/GameMap2/schema/BlueprintSchema";

export const Route = createFileRoute("/$locale/apps/derivean/map/construction")(
	{
		async loader({ context: { queryClient, kysely, session } }) {
			const user = await session();

			return {
				user,
				isConstruction: await queryClient.ensureQueryData({
					queryKey: ["GameMap", "isConstruction"],
					async queryFn() {
						return (
							(
								await kysely.transaction().execute((tx) => {
									return tx
										.selectFrom("Construction as c")
										.select([(eb) => eb.fn.count<number>("c.id").as("count")])
										.where("c.userId", "=", user.id)
										.where("c.plan", "=", true)
										.executeTakeFirstOrThrow();
								})
							).count > 0
						);
					},
				}),
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
								output: BlueprintSchema,
							});
						});
					},
				}),
			};
		},
		component() {
			const { user, isConstruction, blueprints } = Route.useLoaderData();

			return (
				<Construction
					userId={user.id}
					isConstruction={isConstruction}
					blueprints={blueprints}
				/>
			);
		},
	},
);
