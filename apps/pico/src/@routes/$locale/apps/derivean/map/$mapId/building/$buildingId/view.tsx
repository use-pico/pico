import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BuildingPanel } from "~/app/derivean/game/GameMap2/Building/BuildingPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/building/$buildingId/view",
)({
	async loader({
		context: { queryClient, kysely },
		params: { mapId, buildingId },
	}) {
		//
	},
	component() {
		const { building } = useLoaderData({
			from: "/$locale/apps/derivean/map/$mapId/building/$buildingId",
		});

		return <BuildingPanel building={building} />;
	},
});
