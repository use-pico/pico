import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";
import { BlueprintProductionIndexMenu } from "~/app/derivean/game/BlueprintProductionIndexMenu";
import { BlueprintProductionPreview } from "~/app/derivean/game/BlueprintProductionPreview";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/blueprint/production/$id",
)({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return queryClient.ensureQueryData({
			queryKey: ["Blueprint_Production", id],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return {
						entity: await withFetch({
							select: tx
								.selectFrom("Blueprint_Production as bp")
								.innerJoin("Resource as r", "r.id", "bp.resourceId")
								.innerJoin("Blueprint as bl", "bl.id", "bp.blueprintId")
								.select([
									"bp.id",
									"bp.amount",
									"bp.cycles",
									"r.name as resource",
									"bp.blueprintId",
									"bl.name as blueprint",
								])
								.where("bp.id", "=", id),
							output: z.object({
								id: z.string().min(1),
								resource: z.string().min(1),
								blueprint: z.string().min(1),
								blueprintId: z.string().min(1),
								amount: z.number().nonnegative(),
								cycles: z.number().int().nonnegative(),
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
				<BlueprintProductionPreview entity={entity} />

				<BlueprintProductionIndexMenu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
