import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";
import { Building_Index_Menu } from "~/app/derivean/game/building/Building_Index_Menu";
import { Building_Preview } from "~/app/derivean/game/building/Building_Preview";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/$id",
)({
	async loader({ context: { kysely }, params: { id } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				entity: await withFetch({
					select: tx
						.selectFrom("Building as b")
						.innerJoin("Building_Base as bb", "bb.id", "b.buildingBaseId")
						.select(["b.id", "bb.name"])
						.where("b.id", "=", id),
					output: z.object({
						id: z.string().min(1),
						name: z.string().min(1),
					}),
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
				<Building_Preview entity={entity} />

				<Building_Index_Menu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
