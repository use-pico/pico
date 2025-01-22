import { createFileRoute } from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";

export const Route = createFileRoute("/$locale/apps/derivean/map/building/$id")(
	{
		async loader({ context: { queryClient, kysely }, params: { id } }) {
			return {
				building: await queryClient.ensureQueryData({
					queryKey: ["GameMap", "building", id],
					async queryFn() {
						return kysely.transaction().execute(async (tx) => {
							return withFetch({
								select: tx
									.selectFrom("Building as b")
									.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
									.select(["b.id", "bl.name"])
									.where("b.id", "=", id),
								output: z.object({
									id: z.string().min(1),
									name: z.string().min(1),
								}),
							});
						});
					},
				}),
			};
		},
	},
);
