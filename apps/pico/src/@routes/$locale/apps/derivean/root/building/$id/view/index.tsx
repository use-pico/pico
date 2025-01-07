import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BuildingCard } from "~/app/derivean/root/building/BuildingCard";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/$id/view/",
)({
	component() {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/$id",
		});

		return (
			<div className={"w-1/2 mx-auto"}>
				<BuildingCard entity={entity} />
			</div>
		);
	},
});
