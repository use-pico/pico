import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/$mapId/road/$roadId/view",
)({
	component() {
		return "mrdka";
	},
});
