import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetchLoader } from "@use-pico/client";
import { BuildingBaseSource } from "~/app/derivean/building/base/BuildingBaseSource";
import { kysely } from "~/app/derivean/db/db";
import { BuildingBaseIndexMenu } from "~/app/derivean/game/building/base/BuildingBaseIndexMenu";
import { BuildingBasePreview } from "~/app/derivean/game/building/base/BuildingBasePreview";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/base/$id",
)({
	async loader({ context: { queryClient }, params: { id } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				entity: await withFetchLoader({
					tx,
					queryClient,
					source: BuildingBaseSource,
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
				<BuildingBasePreview entity={entity} />

				<BuildingBaseIndexMenu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
