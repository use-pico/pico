import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { Map } from "~/app/derivean/map/Map";

export const Route = createFileRoute("/$locale/apps/derivean/map/$mapId")({
	validateSearch: zodValidator(
		z.object({
			zoomToId: z.string().optional(),
			routing: z.boolean().optional(),
		}),
	),
	loaderDeps: ({ search: { routing } }) => ({ routing }),
	async loader({
		context: { queryClient, kysely, session },
		params: { mapId },
		deps: { routing },
	}) {
		const user = await session();

		return {
			user,
			land: await queryClient.ensureQueryData({
				queryKey: ["map", mapId, "land", "list"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Land as l")
								.innerJoin("Region as r", "r.id", "l.regionId")
								.select([
									"l.id",
									"l.regionId",
									"r.name",
									"l.position",
									"r.image",
								])
								.where("l.mapId", "=", mapId)
								.orderBy("l.position"),
							output: z.object({
								id: z.string().min(1),
								name: z.string().min(1),
								image: z.string().nullish(),
								regionId: z.string().min(1),
								position: z.number().int(),
							}),
						});
					});
				},
			}),
			cycle: await queryClient.ensureQueryData({
				queryKey: ["map", mapId, "cycle"],
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
		const { user, land, cycle } = Route.useLoaderData();
		const { zoomToId, routing } = Route.useSearch();
		const { mapId } = Route.useParams();

		return (
			<Map
				mapId={mapId}
				userId={user.id}
				cycle={cycle}
				land={land}
			/>
		);
	},
});
