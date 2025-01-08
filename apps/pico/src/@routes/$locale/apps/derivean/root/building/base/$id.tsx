import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";
import { BuildingBaseIndexMenu } from "~/app/derivean/root/building/base/BuildingBaseIndexMenu";
import { BuildingBasePreview } from "~/app/derivean/root/building/base/BuildingBasePreview";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id",
)({
	async loader({ context: { kysely }, params: { id } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				entity: await withFetch({
					select: tx
						.selectFrom("Building_Base as bb")
						.innerJoin("Resource as r", "r.id", "bb.resourceId")
						.selectAll("bb")
						.select("r.name as name")
						.where("bb.id", "=", id),
					output: z.object({
						id: z.string().min(1),
						name: z.string().min(1),
						resourceId: z.string().min(1),
						cycles: z.number().nonnegative(),
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
				<BuildingBasePreview entity={entity} />

				<BuildingBaseIndexMenu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
