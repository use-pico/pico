import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFilter,
    navigateOnFulltext,
    navigateOnSelection,
    Tx,
    withListCount,
    withSourceSearchSchema,
} from "@use-pico/client";
import { z } from "zod";
import { Building_Schema } from "~/app/derivean/schema/BuildingSchema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/list",
)({
	validateSearch: zodValidator(withSourceSearchSchema(Building_Schema)),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({ context: { queryClient, kysely }, deps: { filter, cursor } }) {
		return queryClient.ensureQueryData({
			queryKey: ["Building", "list-count", { filter, cursor }],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Building as b")
							.innerJoin("Building_Base as bb", "bb.id", "b.id")
							.select(["b.id", "bb.name", "b.buildingBaseId"]),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							buildingBaseId: z.string().min(1),
						}),
						filter,
						cursor,
					});
				});
			},
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
				<Building_Table
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
						textTotal: <Tx label={"Number of buildings (label)"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
