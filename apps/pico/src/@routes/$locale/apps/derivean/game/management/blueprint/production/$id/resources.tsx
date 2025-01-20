import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFilter,
    navigateOnFulltext,
    Tx,
    withListCount,
    withSourceSearchSchema,
} from "@use-pico/client";
import { z } from "zod";
import { BlueprintProductionResourceTable } from "~/app/derivean/game/BlueprintProductionResourceTable";
import { BlueprintProductionResourceSchema } from "~/app/derivean/schema/BlueprintProductionResourceSchema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/management/blueprint/production/$id/resources",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(BlueprintProductionResourceSchema),
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
				"Blueprint_Production_Resource",
				"list-count",
				id,
				{ filter, cursor },
			],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Blueprint_Production_Resource as bpr")
							.innerJoin("Resource as r", "r.id", "bpr.resourceId")
							.select(["bpr.id", "r.name", "bpr.resourceId", "bpr.amount"])
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
				<BlueprintProductionResourceTable
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
							<Tx
								label={"Number of production resource requirements (label)"}
							/>
						),
						...navigateOnCursor(navigate),
					}}
				/>
			</>
		);
	},
});
