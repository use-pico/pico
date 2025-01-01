import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { BuildingIndexMenu } from "~/app/derivean/building/BuildingIndexMenu";
import { BuildingPreview } from "~/app/derivean/building/BuildingPreview";
import { BuildingRepository } from "~/app/derivean/building/BuildingRepository";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/$id",
)({
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
	async loader({ context: { queryClient }, params: { id } }) {
		return {
			entity: await BuildingRepository.withFetchLoader({
				queryClient,
				where: { id },
			}),
		};
	},
});
