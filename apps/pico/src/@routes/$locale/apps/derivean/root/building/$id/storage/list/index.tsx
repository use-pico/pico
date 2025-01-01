import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/$id/storage/list/",
)({
	component() {
		return "building inventory?";
	},
});
