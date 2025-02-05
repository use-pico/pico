import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";

export const Route = createFileRoute("/$locale/apps/derivean/root/region/$id")({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return queryClient.ensureQueryData({
			queryKey: ["Region", id],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return {
						entity: await withFetch({
							select: tx
								.selectFrom("Region as r")
								.select(["r.id", "r.name", "r.image"])
								.where("r.id", "=", id),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								image: z.string().nullish(),
							}),
						}),
					};
				});
			},
		});
	},
	component: () => {
		const { tva } = useRouteContext({ from: "__root__" });

		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<Outlet />
			</div>
		);
	},
});
