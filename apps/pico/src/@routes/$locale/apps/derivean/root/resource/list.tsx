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
import { Resource_Table } from "~/app/derivean/root/resource/Resource_Table";
import { Resource_Schema } from "~/app/derivean/schema/resource/Resource_Schema";
import { Tag_Schema } from "~/app/derivean/schema/tag/Tag_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/resource/list",
)({
	validateSearch: zodValidator(withSourceSearchSchema(Resource_Schema)),
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
						select: tx.selectFrom("Resource as r").select([
							"r.id",
							"r.name",
							(eb) =>
								eb
									.selectFrom("Tag as t")
									.innerJoin("Resource_Tag as rt", "rt.resourceId", "r.id")
									.select((eb) => {
										return sql<string>`json_group_array(json_object(
                                            'id', ${eb.ref("t.id")},
                                            'code', ${eb.ref("t.code")},
                                            'group', ${eb.ref("t.group")},
                                            'sort', ${eb.ref("t.sort")},
                                            'label', ${eb.ref("t.label")},
                                        ))`.as("tags");
									})
									.as("tags"),
						]),
						query({ select, where }) {
							let $select = select;

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`.toLowerCase();

								$select = $select.where((eb) => {
									return eb.or([
										eb("r.id", "=", fulltext),
										eb("r.name", "=", fulltext),
									]);
								});
							}

							return $select;
						},
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							tags: withJsonArraySchema(Tag_Schema.entity),
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
				<Resource_Table
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
