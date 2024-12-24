import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/item/$id/view/",
)({
	component: () => {
		return <div>Hello "/$locale/apps/derivean/root/item/$id/view/"!</div>;
	},
});
