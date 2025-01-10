import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";
import { Building_Base_Production_Index_Menu } from "~/app/derivean/root/building/Building_Base_Production_Index_Menu";
import { Building_Base_Production_Preview } from "~/app/derivean/root/building/Building_Base_Production_Preview";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/production/$id",
)({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return queryClient.ensureQueryData({
			queryKey: ["Building_Base_Production", id],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return {
						entity: await withFetch({
							select: tx
								.selectFrom("Building_Base_Production as bbp")
								.innerJoin("Resource as r", "r.id", "bbp.resourceId")
								.innerJoin("Building_Base as bb", "bb.id", "bbp.buildingBaseId")
								.select([
									"bbp.id",
									"bbp.amount",
									"bbp.cycles",
									"bbp.limit",
									"r.name",
									"bbp.buildingBaseId",
									"bb.name as buildingName",
								])
								.where("bbp.id", "=", id),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								buildingBaseId: z.string().min(1),
								buildingName: z.string().min(1),
								amount: z.number().nonnegative(),
								cycles: z.number().int().nonnegative(),
								limit: z.number().int().nonnegative(),
							}),
						}),
					};
				});
			},
		});
	},
	component() {
		const { entity } = Route.useLoaderData();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<Building_Base_Production_Preview entity={entity} />

				<Building_Base_Production_Index_Menu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
