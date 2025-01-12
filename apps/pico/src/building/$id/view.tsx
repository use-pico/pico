import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Building_Card } from "~/app/derivean/root/building/Building_Card";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/$id/view",
)({
	component() {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/$id",
		});

		return (
			<div className={"w-1/2 mx-auto"}>
				<Building_Card entity={entity} />
			</div>
		);
	},
});
