import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { LinkPanel } from "~/app/derivean/game/GameMap2/Building/Link/LinkPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/building/$buildingId/link",
)({
	async loader({
		context: { queryClient, kysely },
		params: { mapId, buildingId },
	}) {
		return {
			link: await queryClient.ensureQueryData({
				queryKey: ["GameMap", mapId, "building", buildingId, "link"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Building_To_Building as btb")
								.innerJoin("Building as b", "b.id", "btb.linkId")
								.innerJoin("Land as l", "l.id", "b.landId")
								.innerJoin("Region as r", "r.id", "l.regionId")
								.innerJoin("Blueprint as bp", "bp.id", "b.blueprintId")
								.select(["btb.id", "bp.name", "b.landId", "r.name as land"])
								.where("btb.buildingId", "=", buildingId)
								.orderBy("bp.name"),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								landId: z.string().min(1),
								land: z.string().min(1),
							}),
						});
					});
				},
			}),
		};
	},
	component() {
		const { building } = useLoaderData({
			from: "/$locale/apps/derivean/map/$mapId/building/$buildingId",
		});
		const { link } = Route.useLoaderData();

		return (
			<LinkPanel
				link={link}
				building={building}
			/>
		);
	},
});
