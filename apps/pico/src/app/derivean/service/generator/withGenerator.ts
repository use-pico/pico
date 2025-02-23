import { hexToRGB } from "@use-pico/common";
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
			land: Noise;
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

	const { land } = noise({
		seed,
	});

	const colorBuffers = new Map<string, Uint8Array>(
		Array.from(GameConfig.colorMap, ({ color }) => {
			const { r, g, b } = hexToRGB(color);
			return [color, new Uint8Array([r, g, b, 255])];
		}),
	);

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

			const noise = land(worldX, worldZ);

			const reversedRow = gameConfig.plotCount - 1 - tileZ;

			buffer.set(
				colorBuffers.get(withColorMap({ value: noise, gameConfig }))!,
				(reversedRow * gameConfig.plotCount + tileX) * 4,
			);
		}

		const levelSize = gameConfig.chunkSize * level.layer.level;
		const offset = (gameConfig.chunkSize * (level.layer.level - 1)) / 2;

		return {
			id: `${x}:${z}:${level.layer.level}`,
			x: x * levelSize + offset,
			z: z * levelSize + offset,
			size: levelSize,
			level: level.layer.level,
			texture: {
				size: gameConfig.plotCount,
				data: buffer,
			},
		} satisfies Chunk.Data;
	};
};
