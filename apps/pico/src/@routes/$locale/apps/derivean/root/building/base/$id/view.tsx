import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BuildingBaseCard } from "~/app/derivean/root/building/base/BuildingBaseCard";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/view",
)({
	component: () => {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/base/$id",
		});

		return (
			<div className={"w-1/2 mx-auto"}>
				<BuildingBaseCard entity={entity} />
			</div>
		);
	},
});
