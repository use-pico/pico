import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetchLoader } from "@use-pico/client";
import { BuildingIndexMenu } from "~/app/derivean/root/building/BuildingIndexMenu";
import { BuildingPreview } from "~/app/derivean/root/building/BuildingPreview";
import { BuildingSource } from "~/app/derivean/building/BuildingSource";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/$id",
)({
	async loader({ context: { kysely, queryClient }, params: { id } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				entity: await withFetchLoader({
					tx,
					queryClient,
					source: BuildingSource,
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
				<BuildingPreview entity={entity} />

				<BuildingIndexMenu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
