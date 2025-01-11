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
import { Building_Resource_Queue_Table } from "~/app/derivean/game/building/Building_Resource_Queue_Table";
import { Building_Queue_Schema } from "~/app/derivean/schema/building/Building_Queue_Schema";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/queue/resources",
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
					.selectFrom("Building_Resource_Queue as brq")
					.innerJoin(
						"Building_Base_Production as bbp",
						"bbp.id",
						"brq.buildingBaseProductionId",
					)
					.innerJoin("Resource as r", "r.id", "bbp.resourceId")
					.innerJoin("Building_Base as bb", "bb.id", "bbp.buildingBaseId")
					.select([
						"brq.id",
						"brq.buildingId",
						"bb.name",
						"bbp.amount",
						"r.name as resource",
						"brq.cycle",
						"brq.from",
						"brq.to",
					])
					.where("brq.userId", "=", user.id),
				output: z.object({
					id: z.string().min(1),
					name: z.string().min(1),
					resource: z.string().min(1),
					buildingId: z.string().min(1),
					cycle: z.number(),
					amount: z.number(),
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
				<Building_Resource_Queue_Table
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
