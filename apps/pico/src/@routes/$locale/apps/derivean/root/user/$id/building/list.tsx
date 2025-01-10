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
import { Building_Table } from "~/app/derivean/root/building/Building_Table";
import { Building_Schema } from "~/app/derivean/schema/building/Building_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/user/$id/building/list",
)({
	validateSearch: zodValidator(withSourceSearchSchema(Building_Schema)),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({
		context: { queryClient, kysely },
		deps: { filter, cursor },
		params: { id },
	}) {
		return queryClient.ensureQueryData({
			queryKey: ["Building", "list-count", id, { filter, cursor }],
			async queryFn() {
				return kysely.transaction().execute((tx) => {
					return withListCount({
						select: tx
							.selectFrom("Building as b")
							.innerJoin("Building_Base as bb", "bb.id", "b.buildingBaseId")
							.select(["b.id", "bb.name", "b.buildingBaseId"])
							.where("b.userId", "=", id),
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
	component() {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const { id } = Route.useParams();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<Building_Table
					userId={id}
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
