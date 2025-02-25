import { BeachBiome } from "~/app/derivean/map/biome/BeachBiome";
import { GreenlandBiome } from "~/app/derivean/map/biome/GreenlandBiome";
import { OceanBiome } from "~/app/derivean/map/biome/OceanBiome";
import { TestNoise } from "~/app/derivean/service/config/TestNoise";
import type { Biome } from "~/app/derivean/type/Biome";
import type { Chunk } from "~/app/derivean/type/Chunk";
import type { NoiseFactory } from "~/app/derivean/type/NoiseFactory";
import type { PlotCount } from "~/app/derivean/type/PlotCount";
import type { PlotSize } from "~/app/derivean/type/PlotSize";

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
	plotSize: PlotSize;
	/**
	 * Number of plots in a single chunk. Also defines overall texture size, so **be very careful** when changing this value as
	 * higher ones may fry your GPU and memory.
	 */
	plotCount: PlotCount;
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
	/**
	 * Noise factory is used to generate biomes; each biome "eats" it's own part of the noise range (-1, 1).
	 *
	 * Usually good idea is to use Voronoi or something like that, so biomes looks a bit more natural.
	 *
	 * You can think of this function as a "biome selector".
	 */
	noise: NoiseFactory;
	/**
	 * Individual biomes used to generate final terrain; each biome get's it's part from noise generator.
	 *
	 * You can also change an order of biomes as noise may like some values more (e.g. more zero centric values).
	 *
	 * Biomes may *not* be ordered logically, you have to finetune an order to fit your desired map.
	 */
	biome: Biome[];
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
	noise: TestNoise,
	/**
	 * Define all available biomes in the world generator.
	 */
	biome: [OceanBiome, GreenlandBiome, BeachBiome],
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
