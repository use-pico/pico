import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { WaypointPanel } from "~/app/derivean/game/GameMap2/Waypoint/WaypointPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/waypoint/$waypointId/view",
)({
	async loader({ context: { session } }) {
		const user = await session();

		return {
			user,
		};
	},
	component() {
		const { user } = Route.useLoaderData();
		const { waypoint } = useLoaderData({
			from: "/$locale/apps/derivean/map/$mapId/waypoint/$waypointId",
		});

		return (
			<WaypointPanel
				userId={user.id}
				waypoint={waypoint}
			/>
		);
	},
});
