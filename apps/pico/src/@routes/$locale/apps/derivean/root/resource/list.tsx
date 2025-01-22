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
import { withFloatSchema, withJsonArraySchema } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { ResourceTable } from "~/app/derivean/root/ResourceTable";
import { ResourceSchema } from "~/app/derivean/schema/ResourceSchema";
import { TagSchema } from "~/app/derivean/schema/TagSchema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/resource/list",
)({
	validateSearch: zodValidator(withSourceSearchSchema(ResourceSchema)),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({ context: { queryClient, kysely }, deps: { filter, cursor } }) {
		return queryClient.ensureQueryData({
			queryKey: ["Resource", "list-count", { filter, cursor }],
			async queryFn() {
				return kysely.transaction().execute((tx) => {
					return withListCount({
						select: tx
							.selectFrom("Resource as r")
							.select([
								"r.id",
								"r.name",
								"r.transport",
								(eb) =>
									eb
										.selectFrom("Tag as t")
										.select((eb) => {
											return sql<string>`json_group_array(json_object(
                                            'id', ${eb.ref("t.id")},
                                            'code', ${eb.ref("t.code")},
                                            'group', ${eb.ref("t.group")},
                                            'sort', ${eb.ref("t.sort")},
                                            'label', ${eb.ref("t.label")}
                                        ))`.as("tags");
										})
										.where(
											"t.id",
											"in",
											eb
												.selectFrom("Resource_Tag as rt")
												.select("rt.tagId")
												.whereRef("rt.resourceId", "=", "r.id"),
										)
										.as("tags"),
								(eb) => {
									return eb
										.selectFrom("Blueprint_Requirement")
										.select((eb) => eb.fn.count("id").as("count"))
										.whereRef("resourceId", "=", "r.id")
										.as("countRequirement");
								},
								(eb) => {
									return eb
										.selectFrom("Blueprint_Production")
										.select((eb) => eb.fn.count("id").as("count"))
										.whereRef("resourceId", "=", "r.id")
										.as("countProduction");
								},
								(eb) => {
									return eb
										.selectFrom("Blueprint_Production_Requirement")
										.select((eb) => eb.fn.count("id").as("count"))
										.whereRef("resourceId", "=", "r.id")
										.as("countProductionRequirement");
								},
							])
							.orderBy("r.name", "asc"),
						query({ select, where }) {
							let $select = select;

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`.toLowerCase();

								$select = $select.where((eb) => {
									return eb.or([
										eb("r.id", "like", fulltext),
										eb("r.name", "like", fulltext),
										eb(
											"r.id",
											"in",
											eb
												.selectFrom("Resource_Tag as rt")
												.innerJoin("Tag as t", "t.id", "rt.tagId")
												.select("rt.resourceId")
												.where((eb) => {
													return eb.or([
														eb("t.code", "like", fulltext),
														eb("t.label", "like", fulltext),
														eb("t.group", "like", fulltext),
													]);
												}),
										),
									]);
								});
							}

							return $select;
						},
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							transport: withFloatSchema(),
							countRequirement: z.number().nonnegative(),
							countProduction: z.number().nonnegative(),
							countProductionRequirement: z.number().nonnegative(),
							tags: withJsonArraySchema(TagSchema.entity),
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
				<ResourceTable
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
