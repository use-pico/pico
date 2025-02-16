import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Game } from "~/app/derivean/Game";
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
									name: "land",
									limit: {
										min: 0,
										max: 0.15,
									},
									layers: [
										{
											name: "land-mass",
											scale: 0.05,
											weight: 0.5,
											limit: {
												min: 0,
												max: 0.25,
											},
										},
										{
											name: "detail1",
											scale: 0.1,
											weight: 0.25,
											limit: {
												min: 0,
												max: 0.25,
											},
										},
										{
											name: "detail2",
											scale: 0.2,
											weight: 0.25,
											limit: {
												min: 0,
												max: 0.25,
											},
										},
										{
											name: "detail3",
											scale: 0.4,
											weight: 0.125,
											limit: {
												min: 0,
												max: 0.25,
											},
										},
										{
											name: "detail4",
											scale: 0.6,
											weight: 0.01,
											limit: {
												min: 0,
												max: 0.25,
											},
										},
									],
									weight: 0.5,
								},
								{
									name: "biome",
									limit: {
										min: 0.15,
										max: 0.4,
									},
									layers: [
										{
											name: "base",
											scale: 0.1,
											weight: 0.5,
											limit: {
												min: 0.2,
												max: 0.4,
											},
										},

										{
											name: "detail1",
											scale: 0.2,
											weight: 1,
										},
										{
											name: "detail2",
											scale: 0.65,
											weight: 0.15,
										},
									],
									weight: 0.75,
								},
								{
									name: "details",
									layers: [
										{
											name: "detail1",
											scale: 0.02,
											weight: 0.75,
										},
									],
									weight: 1,
								},
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
