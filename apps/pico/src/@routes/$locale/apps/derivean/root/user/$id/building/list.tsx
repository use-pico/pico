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
import { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { BuildingTable } from "~/app/derivean/root/building/BuildingTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/user/$id/building/list/",
)({
	validateSearch: zodValidator(withSourceSearchSchema(BuildingSchema)),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({
		context: { kysely },
		deps: { filter, cursor },
		params: { id },
	}) {
		return kysely.transaction().execute((tx) => {
			return withListCount({
				select: tx
					.selectFrom("Building as b")
					.innerJoin("Building_Base as bb", "bb.id", "b.buildingBaseId")
					.innerJoin("Resource as r", "r.id", "bb.resourceId")
					.select(["b.id", "r.name"])
					.where("b.userId", "=", id),
				output: z.object({
					id: z.string().min(1),
					name: z.string().min(1),
				}),
				filter,
				cursor,
			});
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
				<BuildingTable
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
						textTotal: <Tx label={"Number of items"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
