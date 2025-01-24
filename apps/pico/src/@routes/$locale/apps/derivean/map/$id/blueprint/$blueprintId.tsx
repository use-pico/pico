import { createFileRoute } from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$id/blueprint/$blueprintId",
)({
	async loader({
		context: { queryClient, kysely },
		params: { id, blueprintId },
	}) {
		return {
			blueprint: await queryClient.ensureQueryData({
				queryKey: ["GameMap", id, "blueprint", blueprintId],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withFetch({
							select: tx
								.selectFrom("Blueprint as b")
								.select(["b.id", "b.name"])
								.where("b.id", "=", blueprintId),
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
