import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/resource/list/",
)({
	component() {
		return "resources available by default with this building";
	},
});
