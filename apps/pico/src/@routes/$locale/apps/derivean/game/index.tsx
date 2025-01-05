import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/apps/derivean/game/")({
	component: () => {
		return <div>game dashboard here :)</div>;
	},
});
