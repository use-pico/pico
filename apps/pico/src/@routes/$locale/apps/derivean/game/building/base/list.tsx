import {
    createFileRoute,
    useLoaderData,
    useRouteContext,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFilter,
    navigateOnFulltext,
    Tx,
    withListCount,
    withSourceSearchSchema,
} from "@use-pico/client";
import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { Building_Base_Table } from "~/app/derivean/game/building/Building_Base_Table";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/base/list",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema({
			filter: FilterSchema,
		}),
	),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({ context: { kysely }, deps: { filter, cursor } }) {
		return kysely.transaction().execute(async (tx) => {
			return withListCount({
				select: tx
					.selectFrom("Building_Base as bb")
					.select(["bb.id", "bb.name", "bb.cycles"])
					.orderBy("bb.name", "asc"),
				output: z.object({
					id: z.string().min(1),
					name: z.string().min(1),
					cycles: z.number().nonnegative(),
				}),
				filter,
				cursor,
			});
		});
	},
	component() {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;
		const { session } = useLoaderData({
			from: "/$locale/apps/derivean/game",
		});

		return (
			<div className={tv.base()}>
				<Building_Base_Table
					userId={session.id}
					table={{
						data,
						filter: {
							value: filter,
							set: navigateOnFilter(navigate),
						},
					}}
					fulltext={{
						value: filter?.fulltext,
						set: navigateOnFulltext(navigate),
					}}
					cursor={{
						count,
						cursor,
						textTotal: <Tx label={"Number of items"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
