import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { BuildingBaseIndexMenu } from "~/app/derivean/game/building/base/BuildingBaseIndexMenu";
import { BuildingBasePreview } from "~/app/derivean/game/building/base/BuildingBasePreview";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/base/$id",
)({
	async loader({ context: { kysely }, params: { id } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				entity: await tx
					.selectFrom("Building_Base as bb")
					.innerJoin("Resource as r", "r.id", "bb.resourceId")
					.selectAll("bb")
					.select("r.name as name")
					.where("bb.id", "=", id)
					.executeTakeFirstOrThrow(),
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
