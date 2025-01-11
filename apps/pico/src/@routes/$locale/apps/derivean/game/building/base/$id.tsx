import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { Building_Base_Index_Menu } from "~/app/derivean/game/building/Building_Base_Index_Menu";
import { Building_Base_Preview } from "~/app/derivean/game/building/Building_Base_Preview";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/base/$id",
)({
	async loader({ context: { kysely }, params: { id } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				entity: await tx
					.selectFrom("Building_Base as bb")
					.select(["bb.id", "bb.name"])
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
				<Building_Base_Preview entity={entity} />

				<Building_Base_Index_Menu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
