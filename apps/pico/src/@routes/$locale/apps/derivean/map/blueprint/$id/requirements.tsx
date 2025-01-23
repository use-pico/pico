import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { withBoolSchema } from "@use-pico/common";
import { sql } from "kysely";
import { z } from "zod";
import { RequirementPanel } from "~/app/derivean/game/GameMap2/Blueprint/Requirement/RequirementPanel";

export const Route = createFileRoute(
	"/$locale/apps/derivean/map/blueprint/$id/requirements",
)({
	async loader({ context: { queryClient, kysely }, params: { id } }) {
		return {
			requirement: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "building", "requirements", id],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Blueprint_Requirement as br")
								.innerJoin("Resource as r", "r.id", "br.resourceId")
								.select([
									"br.id",
									"r.name",
									"br.amount",
									"br.passive",
									sql.lit("construction").as("type"),
								])
								.where("br.blueprintId", "=", id),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								amount: z.number().nonnegative(),
								passive: withBoolSchema(),
								type: z.enum(["storage", "construction", "input", "output"]),
							}),
						});
					});
				},
			}),
		};
	},
	component() {
		const { blueprint } = useLoaderData({
			from: "/$locale/apps/derivean/map/blueprint/$id",
		});
		const { requirement } = Route.useLoaderData();

		return (
			<RequirementPanel
				blueprint={blueprint}
				requirement={requirement}
			/>
		);
	},
});
