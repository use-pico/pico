import { createFileRoute } from "@tanstack/react-router";
import { withBlueprintLoader } from "~/app/derivean/blueprint/withBlueprintLoader";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/$id",
)({
	async loader({ context: { queryClient }, params: { id } }) {
		return {
			blueprint: await withBlueprintLoader({ queryClient, where: { id } }),
		};
	},
});
