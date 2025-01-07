import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFilter,
    navigateOnFulltext,
    navigateOnSelection,
    Tx,
    withListCountLoader,
    withSourceSearchSchema,
} from "@use-pico/client";
import { UserTable } from "~/app/derivean/root/user/ui/UserTable";
import { UserSchema } from "~/app/derivean/user/UserSchema";
import { UserSource } from "~/app/derivean/user/UserSource";

export const Route = createFileRoute("/$locale/apps/derivean/root/user/list/")({
	validateSearch: zodValidator(withSourceSearchSchema(UserSchema)),
	loaderDeps({ search: { filter, cursor } }) {
		return {
			filter,
			cursor,
		};
	},
	async loader({ context: { queryClient, kysely }, deps: { filter, cursor } }) {
		return kysely.transaction().execute((tx) => {
			return withListCountLoader({
				tx,
				queryClient,
				source: UserSource,
				filter,
				cursor,
			});
		});
	},
	component: () => {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<UserTable
					table={{
						data,
						filter: {
							value: filter,
							set: navigateOnFilter(navigate),
						},
						selection: {
							type: "multi",
							value: selection,
							set: navigateOnSelection(navigate),
						},
					}}
					fulltext={{
						value: filter?.fulltext,
						set: navigateOnFulltext(navigate),
					}}
					cursor={{
						count,
						cursor,
						textTotal: <Tx label={"Number of users (label)"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
