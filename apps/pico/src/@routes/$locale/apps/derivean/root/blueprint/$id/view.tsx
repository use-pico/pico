import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BlueprintCard } from "~/app/derivean/root/BlueprintCard";
import { withBlueprintDependencyGraph } from "~/app/derivean/utils/withBlueprintDependencyGraph";
import { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/$id/view",
)({
	async loader({ context: { kysely } }) {
		return {
			dependencies: await kysely.transaction().execute(async (tx) => {
				return withBlueprintGraph({ tx });
			}),
			upgrade: await kysely.transaction().execute(async (tx) => {
				return withBlueprintDependencyGraph({ tx });
			}),
		};
	},
	component() {
		const { dependencies, upgrade } = Route.useLoaderData();
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/blueprint/$id",
		});

		return (
			<div className={"w-1/2 mx-auto"}>
				<BlueprintCard
					dependencies={dependencies}
					upgrade={upgrade}
					entity={entity}
				/>
			</div>
		);
	},
});
