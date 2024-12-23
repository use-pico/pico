import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BlueprintCard } from "~/app/derivean/blueprint/BlueprintCard";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/$id/view/",
)({
	component: () => {
		const { blueprint } = useLoaderData({
			from: "/$locale/apps/derivean/root/blueprint/$id",
		});

		return (
			<div className={"w-1/2 mx-auto"}>
				<BlueprintCard entity={blueprint} />
			</div>
		);
	},
});
