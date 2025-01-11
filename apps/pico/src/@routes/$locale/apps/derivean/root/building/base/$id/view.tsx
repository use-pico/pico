import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Building_Base_Card } from "~/app/derivean/root/building/Building_Base_Card";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/view",
)({
	component: () => {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/base/$id",
		});
		const { graph } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/base",
		});

		return (
			<div className={"w-1/2 mx-auto"}>
				<Building_Base_Card
					graph={graph}
					entity={entity}
				/>
			</div>
		);
	},
});
