import {
    createFileRoute,
    useLoaderData,
    useRouteContext,
} from "@tanstack/react-router";
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
import { Building_Base_Building_Base_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Building_Base_Requirement_Schema";
import { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";
import { Building_Base_Schema } from "~/app/derivean/schema/building/Building_Base_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/list",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(Building_Base_Schema, {
			size: 100,
		}),
	),
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
								"bb.productionLimit",
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
                                                                        'buildingBaseId', ${eb.ref("bbrr.buildingBaseId")},
                                                                        'name', ${eb.ref("r.name")}
                                                                    ))`.as(
												"requirements",
											);
										})
										.where("bbrr.buildingBaseId", "=", eb.ref("bb.id"))
										.as("requiredResources"),
								(eb) =>
									eb
										.selectFrom(
											"Building_Base_Building_Base_Requirement as bbbbr",
										)
										.innerJoin(
											"Building_Base as bb2",
											"bb2.id",
											"bbbbr.requirementId",
										)
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                        'id', ${eb.ref("bbbbr.id")},
                                                        'amount', ${eb.ref("bbbbr.amount")},
                                                        'requirementId', ${eb.ref("bbbbr.requirementId")},
                                                        'buildingBaseId', ${eb.ref("bbbbr.buildingBaseId")},
                                                        'name', ${eb.ref("bb2.name")}
                                                    ))`.as("requirements");
										})
										.where("bbbbr.buildingBaseId", "=", eb.ref("bb.id"))
										.orderBy("bb2.name", "asc")
										.as("requiredBuildings"),
							])
							.orderBy("bb.name", "asc"),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							cycles: z.number().nonnegative(),
							productionLimit: z.number().nonnegative(),
							requiredResources: withJsonArraySchema(
								Building_Base_Resource_Requirement_Schema.entity.merge(
									z.object({
										name: z.string().min(1),
									}),
								),
							),
							requiredBuildings: withJsonArraySchema(
								Building_Base_Building_Base_Requirement_Schema.entity.merge(
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
		const { graph } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/base",
		});
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<Building_Base_Table
					graph={graph}
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
