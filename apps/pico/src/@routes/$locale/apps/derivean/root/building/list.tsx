import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/list",
)({
	component: () => {
		return <div>Hello "/$locale/apps/derivean/root/building/list/"!</div>;
	},
});
