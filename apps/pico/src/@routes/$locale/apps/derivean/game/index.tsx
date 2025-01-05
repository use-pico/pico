import { createFileRoute } from "@tanstack/react-router";
import { BuildingResourceSource } from "~/app/derivean/building/resource/BuildingResourceSource";
import { kysely } from "~/app/derivean/db/db";
import { resourceSumOf } from "~/app/derivean/resource/resourceSumOf";

export const Route = createFileRoute("/$locale/apps/derivean/game/")({
	component: () => {
		return <div>game dashboard here :)</div>;
	},
	async loader({ context: { session } }) {
		return kysely.transaction().execute(async (tx) => {
			const $session = await session();

			const resources = await BuildingResourceSource.list$({
				tx,
				where: { userId: $session.id },
			});

			const resourceCounts = resourceSumOf({ resources });

			console.log("counts", resourceCounts);
		});
	},
});
