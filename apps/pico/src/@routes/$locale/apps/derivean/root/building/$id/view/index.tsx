import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BuildingCard } from "~/app/derivean/building/BuildingCard";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/$id/view/",
)({
	component() {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/$id",
		});

		return (
			<div>
				<BuildingCard entity={entity} />
			</div>
		);
	},
});
