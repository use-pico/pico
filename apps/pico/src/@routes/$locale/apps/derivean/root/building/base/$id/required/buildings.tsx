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
import { Building_Base_Building_Base_Requirement_Table } from "~/app/derivean/root/building/Building_Base_Building_Base_Requirement_Table";
import { Building_Base_Building_Base_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Building_Base_Requirement_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/required/buildings",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(Building_Base_Building_Base_Requirement_Schema),
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
				"Building_Base_Building_Base_Requirement",
				"list-count",
				id,
				{ filter, cursor },
			],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Building_Base_Building_Base_Requirement as bbbbr")
							.innerJoin("Building_Base as bb", "bb.id", "bbbbr.requirementId")
							.select([
								"bbbbr.id",
								"bb.name",
								"bbbbr.buildingBaseId",
								"bbbbr.requirementId",
								"bbbbr.amount",
							])
							.where("bbbbr.buildingBaseId", "=", id)
							.orderBy("bb.name", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.id) {
								$select = $select.where("bbbbr.id", "=", where.id);
							}
							if (where?.idIn) {
								$select = $select.where("bbbbr.id", "in", where.idIn);
							}

							if (where?.buildingBaseId) {
								$select = $select.where(
									"bbbbr.buildingBaseId",
									"=",
									where.buildingBaseId,
								);
							}

							if (where?.requirementId) {
								$select = $select.where(
									"bbbbr.requirementId",
									"=",
									where.requirementId,
								);
							}

							return $select;
						},
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							buildingBaseId: z.string().min(1),
							requirementId: z.string().min(1),
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
		const { filter, cursor, selection } = Route.useSearch();
		const { id } = Route.useParams();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<Building_Base_Building_Base_Requirement_Table
					buildingBaseId={id}
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
						textTotal: <Tx label={"Number of requirements (label)"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
