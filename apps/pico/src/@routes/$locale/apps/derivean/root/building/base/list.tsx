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
import { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import { BuildingBaseTable } from "~/app/derivean/root/building/base/BuildingBaseTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/list",
)({
	validateSearch: zodValidator(withSourceSearchSchema(BuildingBaseSchema)),
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
					.innerJoin("Resource as r", "r.id", "bb.resourceId")
					.select(["bb.id", "r.name", "bb.cycles"]),
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
	component: () => {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BuildingBaseTable
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
						textTotal: <Tx label={"Number of building bases (label)"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
