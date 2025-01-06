import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/base/$id/view/",
)({
	component() {
		return (
			<div>Hello "/$locale/apps/derivean/game/building/base/$id/view/"!</div>
		);
	},
});
