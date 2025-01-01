import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BaseBuildingCard } from "~/app/derivean/building/base/BaseBuildingCard";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/view/",
)({
	component: () => {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/base/$id",
		});

		return (
			<div className={"w-1/2 mx-auto"}>
				<BaseBuildingCard entity={entity} />
			</div>
		);
	},
});
