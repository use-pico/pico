import { createFileRoute } from "@tanstack/react-router";
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
import { withBoolSchema } from "@use-pico/common";
import { z } from "zod";
import { Building_Base_Production_Requirement_Table } from "~/app/derivean/root/building/Building_Base_Production_Requirement_Table";
import { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/production/$id/requirements",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(Building_Base_Resource_Requirement_Schema),
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
				"Building_Base_Production_Requirement",
				"list-count",
				id,
				{ filter, cursor },
			],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Building_Base_Production_Requirement as bbpr")
							.innerJoin("Resource as r", "r.id", "bbpr.resourceId")
							.select([
								"bbpr.id",
								"r.name",
								"bbpr.resourceId",
								"bbpr.amount",
								"bbpr.passive",
							])
							.where("bbpr.buildingBaseProductionId", "=", id)
							.orderBy("r.name", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.id) {
								$select = $select.where("bbpr.id", "=", where.id);
							}
							if (where?.idIn) {
								$select = $select.where("bbpr.id", "in", where.idIn);
							}

							if (where?.resourceId) {
								$select = $select.where(
									"bbpr.resourceId",
									"=",
									where.resourceId,
								);
							}

							return $select;
						},
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							resourceId: z.string().min(1),
							amount: z.number().nonnegative(),
							passive: withBoolSchema(),
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

		return (
			<>
				<Building_Base_Production_Requirement_Table
					buildingBaseProductionId={id}
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
						textTotal: (
							<Tx label={"Number of production requirements (label)"} />
						),
						...navigateOnCursor(navigate),
					}}
				/>
			</>
		);
	},
});
