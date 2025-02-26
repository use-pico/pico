import { GameConfig } from "~/app/derivean/GameConfig";
import type { Chunk } from "~/app/derivean/type/Chunk";
import type { Noise } from "~/app/derivean/type/Noise";

export function noiseToRgba(noise: number): [number, number, number, number] {
	const clamped = Math.max(-1, Math.min(1, noise));
	const normalized = (clamped + 1) / 2;
	const brightness = Math.round(normalized * 255);
	return [brightness, brightness, brightness, 255];
}

export namespace withGenerator {
	export interface Layer {
		/**
		 * Layer level is used to determine the order of layers.
		 *
		 * Lower levels are drawn first, higher levels are drawn last.
		 *
		 * If a layer won't generate a tile, generator picks next layer.
		 */
		level: number;
		/**
		 * Noise provider.
		 */
		noise: Noise;
		biome: Noise;
	}

	export namespace Generator {
		export interface Props {
			x: number;
			z: number;
		}
	}

	export type Generator = (props: Generator.Props) => Chunk.Data;

	export interface Props {
		seed: string;
		gameConfig: GameConfig;
		level: Chunk.View.Level;
	}
}

export const withGenerator = ({
	seed,
	gameConfig,
	level,
}: withGenerator.Props): withGenerator.Generator => {
	/**
	 * Define base scale for all noises.
	 */
	const baseScale = 1 / (gameConfig.plotCount * (1 / level.layer.level));

	const noise = gameConfig.source({
		seed,
	});

	// const debug: keyof typeof noise | undefined = "biome";
	const debug: keyof typeof noise | undefined = undefined;

	const defaultColor = [0, 0, 0, 0];

	/**
	 * Returns prepared generator for generating chunk data at given position.
	 */
	return ({ x, z }) => {
		/**
		 * Defines overall chunk size (whole area).
		 */
		const size = gameConfig.plotCount ** 2;
		/**
		 * Texture buffer (RGBA) used to store chunk's texture.
		 */
		const buffer = new Uint8Array(size * 4);

		/**
		 * Go over all tiles in the chunk and generate their color based on various noises.
		 */
		for (let i = 0; i < size; i++) {
			/**
			 * Where a tile lies in the chunk coordinates.
			 */
			const tileX = i % gameConfig.plotCount;
			const tileZ = Math.floor(i / gameConfig.plotCount);
			/**
			 * Compute world-wide chunk coordinates, so noise can be properly generated.
			 */
			const worldX =
				(x * gameConfig.plotCount + (i % gameConfig.plotCount)) * baseScale;
			const worldZ =
				(z * gameConfig.plotCount + Math.floor(i / gameConfig.plotCount)) *
				baseScale;

			const biome = noise.biome(worldX, worldZ);
			// const heightmap = noise.heightmap(worldX, worldZ);
			// const temperature = noise.temperature(worldX, worldZ);
			// const moisture = noise.moisture(worldX, worldZ);
			// const shade = noise.shade(worldX, worldZ);

			const color =
				debug ?
					noiseToRgba(noise[debug](worldX, worldZ))
				:	gameConfig.colorMap.find((color) => {
						/**
						 * That edge case when there is just a first color. This does not make a lot of sense.
						 */
						if (
							!color.biome &&
							!color.heightmap &&
							!color.temperature &&
							!color.moisture &&
							!color.shade
						) {
							return color.color;
						}

						return color.biome ?
								biome >= color.biome[0] && biome <= color.biome[1]
							:	true;
						// (color.heightmap ? heightmap >= color.heightmap : true) &&
						// (color.temperature ? temperature >= color.temperature : true) &&
						// (color.moisture ? moisture >= color.moisture : true) &&
						// (color.shade ? shade >= color.shade : true)
					})?.color || defaultColor;

			/**
			 * Output the RGBA color to the final texture.
			 */
			buffer.set(
				color,
				((gameConfig.plotCount - 1 - tileZ) * gameConfig.plotCount + tileX) * 4,
			);
			// buffer.set(
			// 	withColorMap({
			// 		colorMap: gameConfig.colorMap,
			// 		source: {
			// 			heightmap: heightmap(worldX, worldZ),
			// 			biome: biome(worldX, worldZ),
			// 			temperature: temperature(worldX, worldZ),
			// 			moisture: moisture(worldX, worldZ),
			// 			shade: shade(worldX, worldZ),
			// 		},
			// 	}),
			// 	((gameConfig.plotCount - 1 - tileZ) * gameConfig.plotCount + tileX) * 4,
			// );
		}

		/**
		 * Define chunk size based on a current level (LOD).
		 */
		const chunkSize = gameConfig.chunkSize * level.layer.level;
		/**
		 * Keep chunks on different levels properly aligned using this offset.
		 */
		const offset = (gameConfig.chunkSize * (level.layer.level - 1)) / 2;

		/**
		 * So, we're done here, currently only texture is returned.
		 */
		return {
			id: `${x}:${z}:${level.layer.level}`,
			x: x * chunkSize + offset,
			z: z * chunkSize + offset,
			size: chunkSize,
			level: level.layer.level,
			texture: {
				size: gameConfig.plotCount,
				data: buffer,
			},
		} satisfies Chunk.Data;
	};
};
