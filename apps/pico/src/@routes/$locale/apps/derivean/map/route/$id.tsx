import { createFileRoute } from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";

export const Route = createFileRoute("/$locale/apps/derivean/map/route/$id")({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return {
			route: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "route", id],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withFetch({
							select: tx
								.selectFrom("Route as r")
								.innerJoin("Building as bf", "bf.id", "r.fromId")
								.innerJoin("Blueprint as blf", "blf.id", "bf.blueprintId")
								.innerJoin("Building as bt", "bt.id", "r.toId")
								.innerJoin("Blueprint as blt", "blt.id", "bt.blueprintId")
								.select([
									"r.id",
									"r.fromId",
									"r.toId",
									"blf.name as fromName",
									"blt.name as toName",
								])
								.where("r.id", "=", id),
							output: z.object({
								id: z.string().min(1),
								fromId: z.string().min(1),
								toId: z.string().min(1),
								fromName: z.string().min(1),
								toName: z.string().min(1),
							}),
						});
					});
				},
			}),
		};
	},
});
