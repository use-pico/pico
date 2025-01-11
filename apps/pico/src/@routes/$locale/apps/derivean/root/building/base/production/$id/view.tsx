import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/production/$id/view",
)({
	component() {
		return "da view";
	},
});
