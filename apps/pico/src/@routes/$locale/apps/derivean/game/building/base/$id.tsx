import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetchLoader } from "@use-pico/client";
import { BaseBuildingSource } from "~/app/derivean/building/base/BaseBuildingSource";
import { kysely } from "~/app/derivean/db/db";
import { BaseBuildingIndexMenu } from "~/app/derivean/game/building/base/BaseBuildingIndexMenu";
import { BaseBuildingPreview } from "~/app/derivean/game/building/base/BaseBuildingPreview";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/base/$id",
)({
	async loader({ context: { queryClient }, params: { id } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				entity: await withFetchLoader({
					tx,
					queryClient,
					source: BaseBuildingSource,
					where: { id },
				}),
			};
		});
	},
	component() {
		const { tva } = useRouteContext({ from: "__root__" });
		const { entity } = Route.useLoaderData();
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BaseBuildingPreview entity={entity} />

				<BaseBuildingIndexMenu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
