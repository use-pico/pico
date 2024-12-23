import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/$id/view/",
)({
	component: () => {
		return "card";
	},
});
