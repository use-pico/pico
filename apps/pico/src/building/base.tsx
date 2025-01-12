import { createFileRoute } from "@tanstack/react-router";
import { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base",
)({
	async loader({ context: { kysely } }) {
		return {
			graph: await kysely.transaction().execute(async (tx) => {
				return withBlueprintGraph({ tx });
			}),
		};
	},
});
