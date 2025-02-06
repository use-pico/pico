import { createFileRoute } from "@tanstack/react-router";
import { Game } from "~/app/derivean/Game";
import { Map } from "~/app/derivean/map/Map";

export const Route = createFileRoute("/$locale/apps/derivean/map/$mapId")({
	async loader({
		context: { queryClient, kysely, session },
		params: { mapId },
	}) {
		const user = await session();

		return {
			user,
			cycle: await queryClient.ensureQueryData({
				queryKey: ["map", mapId, "cycle"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return (
							await tx
								.selectFrom("Cycle as c")
								.select((eb) => eb.fn.count<number>("c.id").as("count"))
								.where("c.userId", "=", user.id)
								.executeTakeFirstOrThrow()
						).count;
					});
				},
			}),
		};
	},
	component() {
		return <Map config={Game} />;
	},
});
