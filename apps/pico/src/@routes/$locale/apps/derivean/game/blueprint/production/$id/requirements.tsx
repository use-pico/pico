import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFilter,
    navigateOnFulltext,
    Tx,
    withListCount,
    withSourceSearchSchema
} from "@use-pico/client";
import { withBoolSchema } from "@use-pico/common";
import { z } from "zod";
import { BlueprintProductionRequirementTable } from "~/app/derivean/game/BlueprintProductionRequirementTable";
import { BlueprintProductionRequirementSchema } from "~/app/derivean/schema/BlueprintProductionRequirementSchema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/blueprint/production/$id/requirements",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(BlueprintProductionRequirementSchema),
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
				"Blueprint_Production_Requirement",
				"list-count",
				id,
				{ filter, cursor },
			],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Blueprint_Production_Requirement as bpr")
							.innerJoin("Resource as r", "r.id", "bpr.resourceId")
							.select([
								"bpr.id",
								"r.name",
								"bpr.resourceId",
								"bpr.amount",
								"bpr.passive",
							])
							.where("bpr.blueprintProductionId", "=", id)
							.orderBy("r.name", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.id) {
								$select = $select.where("bpr.id", "=", where.id);
							}
							if (where?.idIn) {
								$select = $select.where("bpr.id", "in", where.idIn);
							}

							if (where?.resourceId) {
								$select = $select.where(
									"bpr.resourceId",
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
		const { filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();

		return (
			<>
				<BlueprintProductionRequirementTable
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
