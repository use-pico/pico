import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/route/$routeId/resources",
)({
	component() {
		return "";
	},
});
