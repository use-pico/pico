import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/resource/production/$id/view",
)({
	component() {
		return "bla";
	},
});
