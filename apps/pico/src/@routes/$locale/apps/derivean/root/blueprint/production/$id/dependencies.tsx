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
import { BlueprintProductionDependencyTable } from "~/app/derivean/root/BlueprintProductionDependencyTable";
import { BlueprintProductionDependencySchema } from "~/app/derivean/schema/BlueprintProductionDependencySchema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/production/$id/dependencies",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(BlueprintProductionDependencySchema),
	),
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
			queryKey: [
				"Blueprint_Production_Dependency",
				"list-count",
				id,
				{ filter, cursor },
			],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Blueprint_Production_Dependency as bpd")
							.innerJoin("Blueprint as bl", "bl.id", "bpd.blueprintId")
							.select(["bpd.id", "bl.name", "bpd.blueprintId"])
							.where("bpd.blueprintProductionId", "=", id)
							.orderBy("bl.name", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.id) {
								$select = $select.where("bpd.id", "=", where.id);
							}
							if (where?.idIn) {
								$select = $select.where("bpd.id", "in", where.idIn);
							}

							return $select;
						},
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							blueprintId: z.string().min(1),
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
				<BlueprintProductionDependencyTable
					blueprintProductionId={id}
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
						set: navigateOnFulltext(filter?.fulltext, navigate),
					}}
					cursor={{
						count,
						cursor,
						textTotal: <Tx label={"Number of dependencies (label)"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
