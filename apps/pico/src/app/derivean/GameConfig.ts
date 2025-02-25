import { GreenlandBiome } from "~/app/derivean/map/biome/GreenlandBiome";
import { OceanBiome } from "~/app/derivean/map/biome/OceanBiome";
import type { Noise as CoolNoise } from "~/app/derivean/service/noise/Noise";
import type { Chunk } from "~/app/derivean/type/Chunk";

export namespace GameConfig {
	/**
	 * Pre-defined chunk sizes, so you have some idea what to fill in.
	 */
	export type PlotSize = 4 | 8 | 16 | 32 | 64;
	/**
	 * Pre-defined plot counts (per chunk), so you have some idea what to fill in.
	 */
	export type PlotCount = 64 | 128 | 256 | 512 | 1024;
	/**
	 * Some predefined chunk cache limits.
	 *
	 * Also keep in mind that low numbers may kill some chunks required on the screen, e.g.
	 * renderer needs 64 chunks, but you have only 32 set on the cache.
	 *
	 * Be *extremely careful* with this value, as this has direct impact on (huge) memory usage.
	 */
	export type ChunkLimit = 128 | 256 | 512 | 1024 | 2048;

	export interface Color {
		/**
		 * Noise value input will generate...
		 */
		noise: number;
		/**
		 * ...this color value (HSLA).
		 */
		color: [number, number, number, number];
	}

	/**
	 * Defines required noise sources for a single biome.
	 */
	export type NoiseSource = "heightmap" | "biome" | "temperature" | "moisture";

	/**
	 * Define individual noises to make up a biome.
	 */
	export type Noise = ({
		seed,
	}: {
		seed: string;
	}) => Record<NoiseSource, CoolNoise>;

	/**
	 * Defines structure of a color map used to generate chunk texture.
	 */
	export type ColorMap = Record<NoiseSource, Color[]>;

	/**
	 * Each biome has it's own colormap and noise sources.
	 */
	export interface Biome {
		name: string;
		colorMap: ColorMap;
		noise: Noise;
		weight: number;
	}
}

/**
 * General game configuration used to setup all the internals of the game.
 */
export interface GameConfig {
	/**
	 * Defines, how close camera could be used to zoom in.
	 *
	 * Good starting value is 1.
	 */
	maxZoom: number;
	/**
	 * Defines, how far camera could be used to zoom out.
	 *
	 * Good starting value is 0.005 or something like that. Lowest value is basically zero.
	 *
	 * Be careful with this value, as it may break the game, because you may end up with *a lot* of requested
	 * chunks.
	 *
	 * Also, when you modify this value, keep in mind you should also update {@see GameConfig.layers}.
	 */
	minZoom: number;
	/**
	 * Plot size is the size of a single "pixel", that's a building, road or other entity on a map.
	 *
	 * Be careful, plot size is part of a texture size generated from noise, so making this value bigger is not recommended.
	 */
	plotSize: GameConfig.PlotSize;
	/**
	 * Number of plots in a single chunk. Also defines overall texture size, so **be very careful** when changing this value as
	 * higher ones may fry your GPU and memory.
	 */
	plotCount: GameConfig.PlotCount;
	/**
	 * Pre-computed chunks size (must be plotSize * plotCount).
	 *
	 * Also defines texture size of a single chunk. Keep this number at max of 4096.
	 */
	chunkSize: number;
	/**
	 * Defines number of chunks per layer stored in cache.
	 *
	 * Be careful with this number as high numbers (e.g. 512+) may eat bunch of memory
	 * or even kill the browser tab.
	 */
	chunkLimit: number;
	biome: GameConfig.Biome[];
	/**
	 * Defines which layer is rendered in which zoom level.
	 */
	layers: Chunk.Layer[];
}

export const GameConfig: GameConfig = {
	maxZoom: 1,
	minZoom: 0.001,
	plotSize: 16,
	plotCount: 256,
	chunkSize: 16 * 256,
	chunkLimit: 2048,
	biome: [OceanBiome, GreenlandBiome],
	// biome: [GreenlandBiome],
	layers: [
		{
			min: 0.001,
			max: 0.0025,
			level: 64,
			offset: 4,
		},
		{
			min: 0.0025,
			max: 0.005,
			level: 16,
			offset: 4,
		},
		{
			min: 0.005,
			max: 0.015,
			level: 8,
			offset: 4,
		},
		{
			min: 0.015,
			max: 0.025,
			level: 4,
			offset: 4,
		},
		{
			min: 0.025,
			max: 0.04,
			level: 2,
			offset: 4,
		},
		{
			min: 0.04,
			max: 1,
			level: 1,
			offset: 4,
		},

		// {
		// 	// Level 64: zoom range ≈ [0.00237, 0.00562]
		// 	min: 0.00237,
		// 	max: 0.00562,
		// 	level: 64,
		// 	offset: 4,
		// },
		// {
		// 	// Level 128: zoom range ≈ [0.001, 0.00237]
		// 	min: 0.001,
		// 	max: 0.00237,
		// 	level: 128,
		// 	offset: 4,
		// },
	],
};
