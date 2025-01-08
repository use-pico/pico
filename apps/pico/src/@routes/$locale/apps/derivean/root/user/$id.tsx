import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetch } from "@use-pico/client";
import { z } from "zod";
import { UserIndexMenu } from "~/app/derivean/root/user/ui/UserIndexMenu";
import { UserPreview } from "~/app/derivean/root/user/ui/UserPreview";

export const Route = createFileRoute("/$locale/apps/derivean/root/user/$id")({
	async loader({ context: { kysely }, params: { id } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				entity: await withFetch({
					select: tx
						.selectFrom("User as u")
						.select(["u.id", "u.name"])
						.where("u.id", "=", id),
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
				<UserPreview entity={entity} />

				<UserIndexMenu entity={entity} />

				<Outlet />
			</div>
		);
	},
});
