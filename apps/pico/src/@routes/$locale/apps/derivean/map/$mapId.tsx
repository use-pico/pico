import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Game } from "~/app/derivean/Game";
import { withGenerator } from "~/app/derivean/service/generator/withGenerator";

export const Route = createFileRoute("/$locale/apps/derivean/map/$mapId")({
	async loader({
		context: { queryClient, kysely, session },
		params: { mapId },
	}) {
		const user = await session();

		return {
			user,
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
		const { mapId } = Route.useParams();

		const canvasRef = useRef<HTMLCanvasElement>(null);

		const count = 16;

		useEffect(() => {
			if (!canvasRef.current) {
				return;
			}
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				return;
			}
			canvas.width = count * Game.chunkSize;
			canvas.height = count * Game.chunkSize;

			const generator = withGenerator({
				plotCount: Game.plotCount,
				plotSize: Game.plotSize,
				seed: "some-seed",
				scale: 1,
				tile: {
					id: "grass",
					chance: 100,
					color: "#00FF00",
					noise: 1,
				},
				layers() {
					return [];
				},
			});
			for (let x = 0; x < count; x++) {
				for (let z = 0; z < count; z++) {
					const tiles = generator({ x, z });
					console.log("tiles", tiles);
					tiles.forEach(({ abs, tile: { color } }) => {
						ctx.fillStyle = color;
						ctx.fillRect(abs.x, abs.z, Game.plotSize, Game.plotSize);
						ctx.strokeStyle = "#ccc";
						ctx.strokeRect(abs.x, abs.z, Game.plotSize, Game.plotSize);
					});
				}
			}
		}, []);

		return (
			<div className={"w-screen h-screen overflow-auto"}>
				<canvas
					ref={canvasRef}
					style={{ display: "block" }}
				/>
			</div>

			// <Map
			// 	mapId={mapId}
			// 	config={Game}
			// />
		);
	},
});
