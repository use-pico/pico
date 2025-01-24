import { createFileRoute } from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$id/land/$landId",
)({
	async loader({ context: { queryClient, kysely }, params: { id, landId } }) {
		return {
			land: await queryClient.ensureQueryData({
				queryKey: ["GameMap", id, "land-fetch", landId],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withFetch({
							select: tx
								.selectFrom("Land as l")
								.innerJoin("Region as r", "r.id", "l.regionId")
								.select(["l.id", "r.name", "l.mapId"])
								.where("l.id", "=", landId),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								mapId: z.string().min(1),
							}),
						});
					});
				},
			}),
		};
	},
});
