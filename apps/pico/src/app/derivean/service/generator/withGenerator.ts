import { hexToRGB } from "@use-pico/common";
import { Game } from "~/app/derivean/Game";
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

	export type Generator = (props: Generator.Props) => Chunk;

	export interface Props {
		seed: string;
		plotCount: number;
		scale?: number;
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
	plotCount,
	scale = 1,
	noise,
}: withGenerator.Props): withGenerator.Generator => {
	const baseScale = 1 / (plotCount * scale);

	const { land } = noise({
		seed,
	});

	const colorBuffers = new Map<string, Uint8Array>(
		Array.from(Game.colorMap, ({ color }) => {
			const { r, g, b } = hexToRGB(color);
			return [color, new Uint8Array([r, g, b, 255])];
		}),
	);

	return ({ x, z }) => {
		const size = plotCount ** 2;
		const buffer = new Uint8Array(size * 4);

		for (let i = 0; i < size; i++) {
			const tileX = i % plotCount;
			const tileZ = Math.floor(i / plotCount);
			const worldX = (x * plotCount + (i % plotCount)) * baseScale;
			const worldZ = (z * plotCount + Math.floor(i / plotCount)) * baseScale;

			const noise = land(worldX, worldZ);

			const reversedRow = plotCount - 1 - tileZ;

			buffer.set(
				colorBuffers.get(
					withColorMap({ value: noise, levels: Game.colorMap }),
				)!,
				(reversedRow * plotCount + tileX) * 4,
			);
		}

		return {
			id: `${x}:${z}`,
			x,
			z,
			texture: {
				size: plotCount,
				data: buffer,
			},
		};
	};
};
