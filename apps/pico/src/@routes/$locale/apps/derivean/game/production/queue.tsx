import { createFileRoute } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/production/queue",
)({
	async loader({ context: { queryClient, kysely, session } }) {
		const user = await session();
		const data = await queryClient.ensureQueryData({
			queryKey: ["Management", "Production-Queue", user.id],
			queryFn: async () => {
				return withList({
					select: kysely
						.selectFrom("Production_Queue as pq")
						.innerJoin(
							"Blueprint_Production as bp",
							"bp.id",
							"pq.blueprintProductionId",
						)
						.innerJoin("Blueprint as bl", "bl.id", "bp.blueprintId")
						.select(["pq.id", "pq.blueprintProductionId", "bl.name"])
						.where("userId", "=", user.id)
						.orderBy("priority", "desc"),
					output: z.object({
						id: z.string().min(1),
						blueprintProductionId: z.string().min(1),
						name: z.string().min(1),
					}),
				});
			},
		});

		return {
			data,
		};
	},
	component() {
		const { data } = Route.useLoaderData();

		return (
			<div className={"flex flex-col gap-2"}>
				{data.map((item) => {
					return (
						<div
							key={item.id}
							className={"flex flex-row items-center gap-1"}
						>
							<div>{item.name}</div>
						</div>
					);
				})}
			</div>
		);
	},
});
