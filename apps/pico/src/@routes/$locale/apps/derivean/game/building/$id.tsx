import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { BuildingSource } from "~/app/derivean/building/BuildingSource";
import { BuildingIndexMenu } from "~/app/derivean/game/building/BuildingIndexMenu";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/$id",
)({
	async loader({ context: { kysely }, params: { id } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				entity: await BuildingSource.getOrThrow$({
					tx,
					id,
					error: "Cannot find a building",
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
				<BuildingIndexMenu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
