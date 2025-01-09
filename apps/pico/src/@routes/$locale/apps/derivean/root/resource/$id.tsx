import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";
import { ResourceIndexMenu } from "~/app/derivean/root/resource/ResourceIndexMenu";
import { ResourcePreview } from "~/app/derivean/root/resource/ResourcePreview";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/resource/$id",
)({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return queryClient.ensureQueryData({
			queryKey: ["Resource", id],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return {
						entity: await withFetch({
							select: tx
								.selectFrom("Resource as r")
								.select(["r.id", "r.name"])
								.where("r.id", "=", id),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
							}),
						}),
					};
				});
			},
		});
	},
	component: () => {
		const { tva } = useRouteContext({ from: "__root__" });
		const { entity } = Route.useLoaderData();

		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<ResourcePreview entity={entity} />

				<ResourceIndexMenu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
