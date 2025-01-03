import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/$id/view/",
)({
	component() {
		return "detail";
	},
});
