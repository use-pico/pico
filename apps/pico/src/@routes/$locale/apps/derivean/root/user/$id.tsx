import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { UserIndexMenu } from "~/app/derivean/user/UserIndexMenu";
import { UserPreview } from "~/app/derivean/user/UserPreview";
import { UserRepository } from "~/app/derivean/user/UserRepository";

export const Route = createFileRoute("/$locale/apps/derivean/root/user/$id")({
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
	async loader({ context: { queryClient }, params: { id } }) {
		return {
			entity: await UserRepository.withFetchLoader({
				queryClient,
				where: { id },
			}),
		};
	},
});
