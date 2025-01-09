import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";
import { ResourceProductionIndexMenu } from "~/app/derivean/root/resource/production/ResourceProductionIndexMenu";
import { ResourceProductionPreview } from "~/app/derivean/root/resource/production/ResourceProductionPreview";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/resource/production/$id",
)({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return queryClient.ensureQueryData({
			queryKey: ["Resource_Production", id],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return {
						entity: await withFetch({
							select: tx
								.selectFrom("Resource_Production as rp")
								.innerJoin("Resource as r", "r.id", "rp.resourceId")
								.select(["rp.id", "r.name", "rp.resourceId"])
								.where("rp.id", "=", id),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								resourceId: z.string().min(1),
							}),
						}),
					};
				});
			},
		});
	},
	component() {
		const { tva } = useRouteContext({ from: "__root__" });
		const { entity } = Route.useLoaderData();

		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<ResourceProductionPreview entity={entity} />

				<ResourceProductionIndexMenu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
