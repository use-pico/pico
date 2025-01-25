import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/user/$id/view",
)({
	component() {
		return "yep";
	},
});
