import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/$id/view/",
)({
	component() {
		return "yep";
	},
});
