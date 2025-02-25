import { GameConfig } from "~/app/derivean/GameConfig";
import { withColorMap } from "~/app/derivean/service/generator/withColorMap";
import type { Biome } from "~/app/derivean/type/Biome";
import type { Chunk } from "~/app/derivean/type/Chunk";
import type { Noise } from "~/app/derivean/type/Noise";

export namespace withBiome {
	export interface Props {
		noise: number;
		biomes: Biome[];
	}
}

export const withBiome = ({ noise, biomes }: withBiome.Props) => {
	const count = biomes.length;
	let index = Math.floor((noise + 1) / (2 / count));
	if (index >= count) {
		index = count - 1;
	}
	return biomes[index]!;
};

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

	const base = gameConfig.noise(seed);

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
			 * Biome selector.
			 */
			const noise = base(worldX, worldZ);
			const biome = withBiome({ noise, biomes: gameConfig.biome });
			const biomeNoise = biome.noise({
				seed,
			});

			/**
			 * Output the RGBA color to the final texture.
			 */
			buffer.set(
				withColorMap({
					noise,
					colorMap: biome.colorMap,
					heightmap: biomeNoise.heightmap(worldX, worldZ),
					temperature: biomeNoise.temperature(worldX, worldZ),
					moisture: biomeNoise.moisture(worldX, worldZ),
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
