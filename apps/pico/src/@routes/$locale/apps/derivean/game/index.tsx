import { createFileRoute } from "@tanstack/react-router";
import { BuildingResourceRepository } from "~/app/derivean/building/resource/BuildingResourceRepository";
import { kysely } from "~/app/derivean/db/db";
import { resourceSumOf } from "~/app/derivean/resource/resourceSumOf";

export const Route = createFileRoute("/$locale/apps/derivean/game/")({
	component: () => {
		return <div>game dashboard here :)</div>;
	},
	async loader({ context: { session } }) {
		return kysely.transaction().execute(async (tx) => {
			const $session = await session();

			const resources = await BuildingResourceRepository(tx).list({
				tx,
				query: { where: { userId: $session.id } },
			});

			const resourceCounts = resourceSumOf({ resources });

			console.log("counts", resourceCounts);
		});
	},
});
