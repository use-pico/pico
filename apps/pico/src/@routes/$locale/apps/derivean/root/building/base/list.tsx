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
import { withJsonArraySchema } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { Building_Base_Table } from "~/app/derivean/root/building/Building_Base_Table";
import { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";
import { Building_Base_Schema } from "~/app/derivean/schema/building/Building_Base_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/list",
)({
	validateSearch: zodValidator(withSourceSearchSchema(Building_Base_Schema)),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({ context: { queryClient, kysely }, deps: { filter, cursor } }) {
		return queryClient.ensureQueryData({
			queryKey: ["Building_Base", "list-count", { filter, cursor }],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Building_Base as bb")
							.select([
								"bb.id",
								"bb.name",
								"bb.cycles",
								(eb) =>
									eb
										.selectFrom("Building_Base_Resource_Requirement as bbrr")
										.innerJoin("Resource as r", "r.id", "bbrr.resourceId")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                                        'id', ${eb.ref("bbrr.id")},
                                                                        'amount', ${eb.ref("bbrr.amount")},
                                                                        'passive', ${eb.ref("bbrr.passive")},
                                                                        'resourceId', ${eb.ref("bbrr.resourceId")},
                                                                        'name', ${eb.ref("r.name")}
                                                                    ))`.as(
												"requirements",
											);
										})
										.where("bbrr.buildingBaseId", "=", "bb.id")
										.as("requirements"),
							])
							.orderBy("bb.name", "asc"),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							cycles: z.number().nonnegative(),
							requirements: withJsonArraySchema(
								Building_Base_Resource_Requirement_Schema.entity.merge(
									z.object({
										name: z.string().min(1),
									}),
								),
							),
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
				<Building_Base_Table
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
