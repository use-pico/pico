import { createFileRoute } from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/blueprint/$id",
)({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return {
			blueprint: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "blueprint", id],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withFetch({
							select: tx
								.selectFrom("Blueprint as b")
								.select(["b.id", "b.name"])
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
});
