import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { withFetchLoader } from "@use-pico/client";
import { kysely } from "~/app/derivean/db/db";
import { UserIndexMenu } from "~/app/derivean/user/UserIndexMenu";
import { UserPreview } from "~/app/derivean/user/UserPreview";
import { UserSource } from "~/app/derivean/user/UserSource";

export const Route = createFileRoute("/$locale/apps/derivean/root/user/$id")({
	async loader({ context: { queryClient }, params: { id } }) {
		return kysely.transaction().execute(async (tx) => {
			return {
				entity: await withFetchLoader({
					tx,
					queryClient,
					source: UserSource,
					where: { id },
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
