import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { ls, withList } from "@use-pico/client";
import { z } from "zod";
import { GameMap2 } from "~/app/derivean/game/GameMap2/GameMap2";
import { ConstructionSchema } from "~/app/derivean/game/GameMap2/schema/ConstructionSchema";
import { QueueSchema } from "~/app/derivean/game/GameMap2/schema/QueueSchema";
import { SessionSchema } from "~/app/derivean/schema/SessionSchema";

export const Route = createFileRoute("/$locale/apps/derivean/map")({
	validateSearch: zodValidator(
		z.object({
			zoomToId: z.string().optional(),
		}),
	),
	async beforeLoad({ context, params: { locale } }) {
		return {
			...context,
			async session() {
				try {
					return SessionSchema.parse(ls.get("session"));
				} catch (_) {
					throw redirect({
						to: `/$locale/apps/derivean/public/login`,
						params: { locale },
					});
				}
			},
		};
	},
	async loader({ context: { queryClient, kysely, session } }) {
		const user = await session();

		return {
			user,
			construction: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "construction", user.id],
				async queryFn() {
					return kysely.transaction().execute((tx) => {
						return withList({
							select: tx
								.selectFrom("Construction as c")
								.innerJoin("Blueprint as bl", "bl.id", "c.blueprintId")
								.select([
									"c.id",
									"c.blueprintId",
									"bl.name",
									"c.x",
									"c.y",
									"c.valid",
								])
								.where("c.plan", "=", true)
								.where("c.userId", "=", user.id),
							output: ConstructionSchema,
						});
					});
				},
			}),
			queue: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "queue", user.id],
				async queryFn() {
					return kysely.transaction().execute((tx) => {
						return withList({
							select: tx
								.selectFrom("Construction as c")
								.innerJoin("Blueprint as bl", "bl.id", "c.blueprintId")
								.select([
									"c.id",
									"c.blueprintId",
									"bl.name",
									"c.x",
									"c.y",
									"c.valid",
									"c.from",
									"c.to",
									"c.cycle",
								])
								.where("c.plan", "=", false)
								.where("c.userId", "=", user.id),
							output: QueueSchema,
						});
					});
				},
			}),
			cycle: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "Cycle"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return (
							await tx
								.selectFrom("Cycle as c")
								.select((eb) => eb.fn.count<number>("c.id").as("count"))
								.where("c.userId", "=", user.id)
								.executeTakeFirstOrThrow()
						).count;
					});
				},
			}),
		};
	},
	component() {
		const { user, construction, queue, cycle } = Route.useLoaderData();
		const { zoomToId } = Route.useSearch();

		return (
			<GameMap2
				userId={user.id}
				cycle={cycle}
				construction={construction}
				queue={queue}
				zoomToId={zoomToId}
			/>
		);
	},
});
