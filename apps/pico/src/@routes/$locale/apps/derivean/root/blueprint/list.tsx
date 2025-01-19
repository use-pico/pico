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
import { BlueprintTable } from "~/app/derivean/root/BlueprintTable";
import { BlueprintDependencySchema } from "~/app/derivean/schema/BlueprintDependencySchema";
import { BlueprintRequirementSchema } from "~/app/derivean/schema/BlueprintRequirementSchema";
import { BlueprintSchema } from "~/app/derivean/schema/BlueprintSchema";
import { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/list",
)({
	validateSearch: zodValidator(withSourceSearchSchema(BlueprintSchema)),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({ context: { queryClient, kysely }, deps: { filter, cursor } }) {
		const data = await queryClient.ensureQueryData({
			queryKey: ["Blueprint", "list-count", { filter, cursor }],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Blueprint as bl")
							.select([
								"bl.id",
								"bl.name",
								"bl.sort",
								"bl.cycles",
								(eb) =>
									eb
										.selectFrom("Blueprint_Requirement as br")
										.innerJoin("Resource as r", "r.id", "br.resourceId")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                'id', ${eb.ref("br.id")},
                                                'amount', ${eb.ref("br.amount")},
                                                'passive', ${eb.ref("br.passive")},
                                                'resourceId', ${eb.ref("br.resourceId")},
                                                'blueprintId', ${eb.ref("br.blueprintId")},
                                                'name', ${eb.ref("r.name")}
                                            ))`.as("requirements");
										})
										.whereRef("br.blueprintId", "=", "bl.id")
										.as("requirements"),
								(eb) =>
									eb
										.selectFrom("Blueprint_Dependency as bd")
										.innerJoin("Blueprint as bl2", "bl2.id", "bd.dependencyId")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                                        'id', ${eb.ref("bd.id")},
                                                        'dependencyId', ${eb.ref("bd.dependencyId")},
                                                        'blueprintId', ${eb.ref("bd.blueprintId")},
                                                        'name', ${eb.ref("bl2.name")}
                                                    ))`.as("requirements");
										})
										.whereRef("bd.blueprintId", "=", "bl.id")
										.orderBy("bl2.name", "asc")
										.as("dependencies"),
							])
							.orderBy("bl.sort", "asc")
							.orderBy("bl.name", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.id) {
								$select = $select.where("bl.id", "=", where.id);
							}

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`.toLowerCase();
								$select = $select.where((eb) => {
									return eb.or([
										eb("bl.id", "like", fulltext),
										eb("bl.name", "like", fulltext),
										// eb(
										// 	"bl.id",
										// 	"in",
										// 	eb
										// 		.selectFrom("Blueprint_Requirement as br")
										// 		.innerJoin("Resource as r", "r.id", "br.resourceId")
										// 		.select("br.blueprintId")
										// 		.where((eb) => {
										// 			return eb.or([eb("r.name", "like", fulltext)]);
										// 		}),
										// ),
										// eb(
										// 	"bl.id",
										// 	"in",
										// 	eb
										// 		.selectFrom("Blueprint_Dependency as bd")
										// 		.innerJoin("Blueprint as b", "b.id", "bd.dependencyId")
										// 		.select("bd.blueprintId")
										// 		.where((eb) => {
										// 			return eb.or([eb("b.name", "like", fulltext)]);
										// 		}),
										// ),
									]);
								});
							}

							return $select;
						},
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							cycles: z.number().nonnegative(),
							sort: z.number().nonnegative(),
							requirements: withJsonArraySchema(
								BlueprintRequirementSchema.entity.merge(
									z.object({
										name: z.string().min(1),
									}),
								),
							),
							dependencies: withJsonArraySchema(
								BlueprintDependencySchema.entity.merge(
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

		return {
			data,
			dependencies: await kysely.transaction().execute(async (tx) => {
				return withBlueprintGraph({ tx });
			}),
		};
	},
	component() {
		const {
			data: { data, count },
			dependencies,
		} = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BlueprintTable
					dependencies={dependencies}
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
						textTotal: <Tx label={"Number of blueprints"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
