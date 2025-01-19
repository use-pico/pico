import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFilter,
    navigateOnFulltext,
    Tx,
    withListCount,
    withSourceSearchSchema
} from "@use-pico/client";
import { z } from "zod";
import { BlueprintTable } from "~/app/derivean/game/BlueprintTable";
import { BlueprintSchema } from "~/app/derivean/schema/BlueprintSchema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/blueprint/list",
)({
	validateSearch: zodValidator(withSourceSearchSchema(BlueprintSchema)),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({
		context: { queryClient, kysely, session },
		deps: { filter, cursor },
	}) {
		const user = await session();

		const data = await queryClient.ensureQueryData({
			queryKey: ["Blueprint", "list-count", { filter, cursor }],
			async queryFn() {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Blueprint as bl")
							.select(["bl.id", "bl.name", "bl.cycles"])
							.where(
								"bl.id",
								"in",
								tx
									.selectFrom("Building as bg")
									.select("bg.blueprintId")
									.where("bg.userId", "=", user.id),
							)
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
						}),
						filter,
						cursor,
					});
				});
			},
		});

		return {
			data,
		};
	},
	component() {
		const {
			data: { data, count },
		} = Route.useLoaderData();
		const { filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BlueprintTable
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
						textTotal: <Tx label={"Number of blueprints"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
