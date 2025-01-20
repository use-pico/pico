import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BlueprintCard } from "~/app/derivean/game/BlueprintCard";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/blueprint/$id/view",
)({
	component() {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/game/blueprint/$id",
		});

		return (
			<div className={"w-1/2 mx-auto"}>
				<BlueprintCard entity={entity} />
			</div>
		);
	},
});
