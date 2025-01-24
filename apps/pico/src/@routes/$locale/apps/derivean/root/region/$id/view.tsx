import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/region/$id/view",
)({
	component() {
		return "view";
	},
});
