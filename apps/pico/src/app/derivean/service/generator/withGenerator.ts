import { toSeed } from "@use-pico/common";
import { XORWow } from "random-seedable";
import type { EntitySchema } from "~/app/derivean/service/generator/EntitySchema";
import type { TileSchema } from "~/app/derivean/service/generator/TileSchema";
import type { Noise } from "~/app/derivean/service/noise/Noise";
import type { Random } from "~/app/derivean/service/noise/Random";

export namespace withGenerator {
	export namespace Layer {
		export namespace Factory {
			export interface Props {
				random: Random;
			}
		}

		export type Factory = (props: Factory.Props) => Layer[];
	}

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

	export type Generator = (props: Generator.Props) => EntitySchema.Type[];

	export interface Props {
		seed: string;
		plotSize: number;
		plotCount: number;
		scale?: number;
		noise: (props: { seed: string }) => {
			land: Noise;
		};
		/**
		 * Default tile when nothing is generated.
		 */
		tile: TileSchema.Type;
		/**
		 * Layers to generate tiles.
		 */
		layers: Layer.Factory;
	}
}

export const withGenerator = ({
	seed,
	plotSize,
	plotCount,
	tile,
	scale = 1,
	noise,
	layers,
}: withGenerator.Props): withGenerator.Generator => {
	const random = new XORWow(toSeed(seed));
	const baseScale = 1 / (plotCount * scale);
	const $layers = layers({
		random() {
			return random.float();
		},
	}).sort((a, b) => a.level - b.level);

	const { land } = noise({
		seed,
	});

	return ({ x, z }) => {
		const chunk = new Array<EntitySchema.Type>(plotCount ** 2);

		for (let i = 0; i < chunk.length; i++) {
			/**
			 * TODO Throw this stuff into async blocks, so all tiles are generated in parallel
			 * TODO Instead of generating noise per plotSize, generate only a pixel of noise
			 */

			const tileX = (i % plotCount) * plotSize;
			const tileZ = Math.floor(i / plotCount) * plotSize;
			const worldX = (x * plotCount + (i % plotCount)) * baseScale;
			const worldZ = (z * plotCount + Math.floor(i / plotCount)) * baseScale;

			// const layer =

			chunk[i] = {
				// tile: config.tiles[tileId]!,
				pos: {
					x: tileX,
					z: tileZ,
				},
				abs: {
					x: tileX + x * plotCount * plotSize,
					z: tileZ + z * plotCount * plotSize,
				},
				noise: land(worldX, worldZ),
				tile: tile.id,
			};
		}

		return chunk;
	};
};
