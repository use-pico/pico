import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { BaseBuildingIndexMenu } from "~/app/derivean/building/base/BaseBuildingIndexMenu";
import { BaseBuildingPreview } from "~/app/derivean/building/base/BaseBuildingPreview";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id",
)({
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
	async loader({ context: { queryClient }, params: { id } }) {
		return {
			entity: await BaseBuildingRepository.withFetchLoader({
				queryClient,
				where: { id },
			}),
		};
	},
});
