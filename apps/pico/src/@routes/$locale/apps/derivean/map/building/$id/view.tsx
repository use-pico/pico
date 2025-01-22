import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BuildingPanel } from "~/app/derivean/game/GameMap2/Building/BuildingPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/building/$id/view",
)({
	component() {
		const { building } = useLoaderData({
			from: "/$locale/apps/derivean/map/building/$id",
		});

		return <BuildingPanel building={building} />;
	},
});
