import { createFileRoute, useRouteContext } from "@tanstack/react-router";
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
import { BuildingTable } from "~/app/derivean/game/building/BuildingTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/list",
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
	async loader({ context: { kysely, session }, deps: { filter, cursor } }) {
		const user = await session();

		return kysely.transaction().execute(async (tx) => {
			return withListCount({
				select: tx
					.selectFrom("Building as b")
					.innerJoin("Building_Base as bb", "bb.id", "b.buildingBaseId")
					.innerJoin("Resource as r", "r.id", "bb.resourceId")
					.select(["b.id", "r.name"])
					.where("b.userId", "=", user.id),
				output: z.object({
					id: z.string().min(1),
					name: z.string().min(1),
				}),
				filter,
				cursor,
			});
		});
	},
	component: () => {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BuildingTable
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
