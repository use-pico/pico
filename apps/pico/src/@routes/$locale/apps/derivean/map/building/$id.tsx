import { createFileRoute } from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { BuildingSchema } from "~/app/derivean/game/GameMap2/schema/BuildingSchema";

export const Route = createFileRoute("/$locale/apps/derivean/map/building/$id")(
	{
		async loader({ context: { queryClient, kysely }, params: { id } }) {
			return {
				entity: await queryClient.ensureQueryData({
					queryKey: ["GameMap", "building", id],
					async queryFn() {
						return kysely.transaction().execute(async (tx) => {
							return withFetch({
								select: tx
									.selectFrom("Building as b")
									.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
									.select(["b.id", "bl.name", "b.x", "b.y"])
									.where("b.id", "=", id),
								output: BuildingSchema,
							});
						});
					},
				}),
			};
		},
	},
);
