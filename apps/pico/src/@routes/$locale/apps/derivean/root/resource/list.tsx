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
import { sql } from "kysely";
import { z } from "zod";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import { ResourceTable } from "~/app/derivean/root/resource/ResourceTable";
import { TagSchema } from "~/app/derivean/tag/TagSchema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/resource/list",
)({
	validateSearch: zodValidator(withSourceSearchSchema(ResourceSchema)),
	loaderDeps({ search: { filter, cursor } }) {
		return {
			filter,
			cursor,
		};
	},
	async loader({ context: { queryClient, kysely }, deps: { filter, cursor } }) {
		return queryClient.ensureQueryData({
			queryKey: ["Resource", "list-count", filter, cursor],
			async queryFn() {
				return kysely.transaction().execute((tx) => {
					return withListCount({
						select: tx.selectFrom("Resource as r").select([
							"r.id",
							"r.name",
							(eb) =>
								eb
									.selectFrom("Tag as t")
									.select((eb) => {
										return sql<string>`json_group_array(json_object(
                                            'id', ${eb.ref("t.id")},
                                            'code', ${eb.ref("t.code")},
                                            'group', ${eb.ref("t.group")},
                                            'label', ${eb.ref("t.label")},
                                            'sort', ${eb.ref("t.sort")}
                                        ))`.as("tags");
									})
									.where(
										"t.id",
										"in",
										eb
											.selectFrom("Resource_Tag as rt")
											.select(["rt.tagId"])
											.where("rt.resourceId", "=", eb.ref("r.id")),
									)
									.as("tags"),
						]),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							tags: z
								.string()
								.transform((value) => JSON.parse(value))
								.refine((tags) => Array.isArray(tags))
								.transform((tags) => z.array(TagSchema.entity).parse(tags)),
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
