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
import { RegionTable } from "~/app/derivean/root/RegionTable";
import { RegionSchema } from "~/app/derivean/schema/RegionSchema";

export const Route = createFileRoute("/$locale/apps/derivean/root/region/list")(
	{
		validateSearch: zodValidator(withSourceSearchSchema(RegionSchema)),
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
		}) {
			return queryClient.ensureQueryData({
				queryKey: ["Region", "list-count", { filter, cursor }],
				async queryFn() {
					return kysely.transaction().execute((tx) => {
						return withListCount({
							select: tx
								.selectFrom("Region as r")
								.select([
									"r.id",
									"r.name",
									"r.color",
									"r.minWidth",
									"r.maxWidth",
									"r.minHeight",
									"r.maxHeight",
									"r.probability",
									"r.limit",
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
										]);
									});
								}

								return $select;
							},
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								color: z.string().min(1),
								minWidth: z.number().int().min(0),
								maxWidth: z.number().int().min(0),
								minHeight: z.number().int().min(0),
								maxHeight: z.number().int().min(0),
								probability: z.number().int().min(0),
								limit: z.number().int().min(0),
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
					<RegionTable
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
	},
);
