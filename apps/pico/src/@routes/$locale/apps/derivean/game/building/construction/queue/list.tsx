import { createFileRoute, useRouteContext } from "@tanstack/react-router";
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
import { Building_Queue_Table } from "~/app/derivean/game/building/Building_Queue_Table";
import { Building_Queue_Schema } from "~/app/derivean/schema/building/Building_Queue_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/construction/queue/list",
)({
	validateSearch: zodValidator(withSourceSearchSchema(Building_Queue_Schema)),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({ context: { kysely, session }, deps: { filter, cursor } }) {
		const user = await session();

		return kysely.transaction().execute(async (tx) => {
			return withListCount({
				select: tx
					.selectFrom("Building_Queue as bq")
					.innerJoin("Building_Base as bb", "bb.id", "bq.buildingBaseId")
					.select(["bq.id", "bb.name", "bq.cycle", "bq.from", "bq.to"])
					.where("bq.userId", "=", user.id),
				output: z.object({
					id: z.string().min(1),
					name: z.string().min(1),
					cycle: z.number(),
					from: z.number(),
					to: z.number(),
				}),
				filter,
				cursor,
			});
		});
	},
	component: () => {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<Building_Queue_Table
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
						textTotal: <Tx label={"Items in building queue (label)"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
