import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Game } from "~/app/derivean/Game";
import { Map } from "~/app/derivean/map/Map";
import { withGenerator } from "~/app/derivean/service/generator/withGenerator";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

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

		const count = 64;
		const scale = 1;

		useEffect(() => {
			if (!canvasRef.current) {
				return;
			}
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				return;
			}
			canvas.width = count * scale * Game.chunkSize;
			canvas.height = count * scale * Game.chunkSize;

			const generator = withGenerator({
				plotCount: Game.plotCount,
				plotSize: Game.plotSize * scale,
				seed: mapId,
				scale: 1,
				noise({ seed }) {
					return {
						land: withNoise({
							seed,
							layers: [
								{
									name: "landmass",
									// limit: { min: 0, max: 0.5 },
									layers: [
										{
											name: "base",
											scale: 0.05,
											weight: 1,
											subtract: true,
											// limit: { min: 0, max: 0.55 },
										},
										{
											name: "variation",
											scale: 0.5,
											weight: 0.5,
											// limit: { min: 0, max: 0.15 },
										},
									],
									weight: 1,
								},
								{
									name: "detail-01",
									crop: { min: 0, max: 0.5 },
									layers: [
										{
											name: "base",
											scale: 0.05,
											weight: 1,
											// limit: { min: 0, max: 0.55 },
										},
										{
											name: "variation",
											scale: 0.5,
											weight: 0.5,
											// limit: { min: 0, max: 0.15 },
										},
									],
									weight: 0.025,
								},
								{
									name: "inverse-detail-01",
									crop: { min: 0, max: 0.5 },
									inverse: true,
									layers: [
										{
											name: "base",
											scale: 0.5,
											weight: 1,
											// limit: { min: 0, max: 0.55 },
										},
										{
											name: "variation",
											scale: 0.5,
											weight: 0.5,
											// limit: { min: 0, max: 0.15 },
										},
									],
									weight: 0.025,
								},
								// {
								// 	name: "biomes",
								// 	limit: { min: 0.25, max: 0.5 },
								// 	layers: [
								// 		{ name: "forest", scale: 0.05, weight: 1 },
								// 		{ name: "desert", scale: 0.08, weight: 1 },
								// 		{ name: "tundra", scale: 0.12, weight: 1 },
								// 	],
								// 	weight: 1,
								// },
								// {
								// 	name: "features",
								// 	limit: { min: 0.5, max: 1.0 },
								// 	layers: [
								// 		{ name: "mountains", scale: 0.02, weight: 0.9 },
								// 		{ name: "rivers", scale: 0.15, weight: 0.4 },
								// 		{ name: "lakes", scale: 0.2, weight: 0.2 },
								// 	],
								// 	weight: 1.0,
								// },
							],
						}),
					};
				},
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

			const floatToGrayscaleHex = (value: number): string => {
				const $value = Math.max(0, Math.min(1, value));

				// Convert to 8-bit grayscale (0-255 range)
				const gray = Math.round($value * 255);

				// Format as hexadecimal color
				const hex = gray.toString(16).padStart(2, "0");
				return `#${hex}${hex}${hex}`;
			};

			for (let x = 0; x < count; x++) {
				for (let z = 0; z < count; z++) {
					const tiles = generator({ x, z });
					tiles.forEach(({ abs, noise }) => {
						ctx.fillStyle = floatToGrayscaleHex(noise);
						ctx.fillRect(
							abs.x,
							abs.z,
							Game.plotSize * scale,
							Game.plotSize * scale,
						);
						// ctx.strokeStyle = "#ccc";
						// ctx.strokeRect(
						// 	abs.x,
						// 	abs.z,
						// 	Game.plotSize * scale,
						// 	Game.plotSize * scale,
						// );
					});
				}
			}
		}, []);

		// <div className={"w-screen h-screen overflow-auto"}>
		// 	<canvas
		// 		ref={canvasRef}
		// 		style={{ display: "block" }}
		// 	/>
		// </div>

		return (
			<Map
				mapId={mapId}
				config={Game}
			/>
		);
	},
});
