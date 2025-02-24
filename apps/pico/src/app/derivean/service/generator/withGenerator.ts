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
		noise: (props: { seed: string }) => {
			/**
			 * Overall heightmap noise.
			 */
			heightmap: Noise;
			/**
			 * Generates biomes over the map.
			 */
			biome: Noise;
			/**
			 * Temperature map.
			 */
			temperature: Noise;
			/**
			 * Moisture map.
			 */
			moisture: Noise;
		};
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
	noise,
}: withGenerator.Props): withGenerator.Generator => {
	const baseScale = 1 / (gameConfig.plotCount * (1 / level.layer.level));

	const { heightmap, biome, temperature, moisture } = noise({
		seed,
	});

	return ({ x, z }) => {
		const size = gameConfig.plotCount ** 2;
		const buffer = new Uint8Array(size * 4);

		for (let i = 0; i < size; i++) {
			const tileX = i % gameConfig.plotCount;
			const tileZ = Math.floor(i / gameConfig.plotCount);
			const worldX =
				(x * gameConfig.plotCount + (i % gameConfig.plotCount)) * baseScale;
			const worldZ =
				(z * gameConfig.plotCount + Math.floor(i / gameConfig.plotCount)) *
				baseScale;

			const [heightmapNoise, biomeNoise, temperatureNoise, moistureNoise] = [
				heightmap(worldX, worldZ),
				biome(worldX, worldZ),
				temperature(worldX, worldZ),
				moisture(worldX, worldZ),
			];

			const inverse = gameConfig.plotCount - 1 - tileZ;

			buffer.set(
				withColorMap({ value: heightmapNoise, gameConfig }),
				(inverse * gameConfig.plotCount + tileX) * 4,
			);
		}

		const chunkSize = gameConfig.chunkSize * level.layer.level;
		const offset = (gameConfig.chunkSize * (level.layer.level - 1)) / 2;

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
