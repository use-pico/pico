import { createFileRoute } from "@tanstack/react-router";
import { BuildingResourceRepository } from "~/app/derivean/building/resource/BuildingResourceRepository";
import { resourceSumOf } from "~/app/derivean/resource/resourceSumOf";

export const Route = createFileRoute("/$locale/apps/derivean/game/")({
	component: () => {
		return <div>game dashboard here :)</div>;
	},
	async loader({ context: { session } }) {
		const $session = await session();

		const resources = await BuildingResourceRepository.list({
			query: { where: { userId: $session.id } },
		});

		const resourceCounts = resourceSumOf({ resources });

		console.log("counts", resourceCounts);
	},
});
