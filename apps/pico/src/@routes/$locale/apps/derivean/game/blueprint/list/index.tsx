import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/blueprint/list/",
)({
	component: () => {
		return <div>Hello "/$locale/apps/derivean/game/blueprint/list/"!</div>;
	},
});
