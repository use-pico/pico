import { createFileRoute } from "@tanstack/react-router";
import { withList } from "@use-pico/client";
import { z } from "zod";
import { bootstrap } from "~/app/derivean/db/kysely";

export const Route = createFileRoute("/$locale/apps/derivean")({
	async loader({ context: { queryClient, kysely } }) {
		await bootstrap();
		return {
			image: await queryClient.ensureQueryData({
				queryKey: ["GameMap", "image"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return withList({
							select: tx
								.selectFrom("Blueprint as b")
								.select(["b.id", "b.image"])
								.where("b.image", "is not", null)
								.union(
									tx
										.selectFrom("Region as r")
										.select(["r.id", "r.image"])
										.where("r.image", "is not", null),
								)
								.union(
									tx
										.selectFrom("Resource as r")
										.select(["r.id", "r.image"])
										.where("r.image", "is not", null),
								),
							output: z.object({
								id: z.string().min(1),
								image: z.string(),
							}),
						});
					});
				},
			}),
		};
	},
	// component() {
	// 	const { image } = Route.useLoaderData();

	// 	return (
	// 		<>
	// 			<style>
	// 				{image
	// 					.filter(({ image }) => image.length > 0)
	// 					.map((bg) => {
	// 						return `
	//                     .bg-${bg.id} {
	//                         background-image: url(${bg.image});
	//                         background-size: cover;
	//                         background-repeat: no-repeat;
	//                         background-position: center;
	//                     }
	//                 `;
	// 					})}
	// 			</style>
	// 			<Outlet />
	// 		</>
	// 	);
	// },
});
