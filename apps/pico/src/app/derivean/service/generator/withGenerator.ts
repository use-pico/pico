import { GameConfig } from "~/app/derivean/GameConfig";
import type { TileSchema } from "~/app/derivean/service/generator/TileSchema";
import { withColorMap } from "~/app/derivean/service/generator/withColorMap";
import type { Noise } from "~/app/derivean/service/noise/Noise";
import type { Chunk } from "~/app/derivean/type/Chunk";

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
		/**
		 * Tiles on this layer.
		 */
		tiles: TileSchema.Type[];
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
		/**
		 * Default tile when nothing is generated.
		 */
		tile: TileSchema.Type;
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

	const biomes = gameConfig.biome.map((biome) => {
		return biome.noise({ seed });
	});

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

			/**
			 * Output the RGBA color to the final texture.
			 */
			buffer.set(
				withColorMap({
					biomes: biomes.map((biome, i) => {
						return {
							map: gameConfig.biome[i]!.colorMap!,
							weight: gameConfig.biome[i]!.weight,
							heightmap: biome.heightmap(worldX, worldZ),
							biome: biome.biome(worldX, worldZ),
							temperature: biome.temperature(worldX, worldZ),
							moisture: biome.moisture(worldX, worldZ),
						} as const;
					}),
				}),
				((gameConfig.plotCount - 1 - tileZ) * gameConfig.plotCount + tileX) * 4,
			);
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
