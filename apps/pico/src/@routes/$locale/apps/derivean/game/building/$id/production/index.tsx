import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/$id/production/",
)({
	component() {
		return (
			<div>Hello "/$locale/apps/derivean/game/building/$id/production/"!</div>
		);
	},
});
