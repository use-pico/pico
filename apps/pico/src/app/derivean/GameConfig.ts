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

	/**
	 * Defines structure of a color map used to generate chunk texture.
	 */
	export interface ColorMap {
		/**
		 * Noise value input will generate...
		 */
		noise: number;
		/**
		 * ...this color value (CSS hex color).
		 */
		color: string;
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
	/**
	 * Defines colors used to generate chunk texture from noise.
	 *
	 * Color map must be in the right order or it will break.
	 *
	 * `colorMap.sort((a, b) => b.noise - a.noise)`
	 */
	colorMap: GameConfig.ColorMap[];
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
	colorMap: [
		/**
		 * Deep Ocean (Dark to Vibrant Blues)
		 */
		{ noise: -1.0, color: "#000022" },
		{ noise: -0.95, color: "#000044" },
		{ noise: -0.9, color: "#001f7f" },
		{ noise: -0.85, color: "#002b9f" },
		{ noise: -0.8, color: "#0037bf" },
		{ noise: -0.75, color: "#0043df" },
		{ noise: -0.7, color: "#0050ff" },
		{ noise: -0.65, color: "#0062ff" },
		{ noise: -0.6, color: "#0074ff" },
		{ noise: -0.55, color: "#0086ff" },
		{ noise: -0.5, color: "#0098ff" },
		/**
		 * Shallow Waters & Beaches (Yellowish Transition)
		 */
		{ noise: -0.45, color: "#00aaff" },
		{ noise: -0.4, color: "#11ccff" },
		{ noise: -0.35, color: "#33ddff" },
		{ noise: -0.3, color: "#55eeff" },
		{ noise: -0.25, color: "#77ffff" },
		{ noise: -0.2, color: "#ccdd77" },
		{ noise: -0.15, color: "#eedd66" },
		{ noise: -0.1, color: "#ffcc44" },
		{ noise: -0.05, color: "#ffaa22" },
		/**
		 * Grasslands (Vibrant Greens)
		 */
		{ noise: 0.0, color: "#44dd44" },
		{ noise: 0.05, color: "#33cc33" },
		{ noise: 0.1, color: "#22bb22" },
		{ noise: 0.15, color: "#22aa22" },
		{ noise: 0.2, color: "#119911" },
		{ noise: 0.25, color: "#008800" },
		/**
		 * Forests (Dense and Deep Greens)
		 */
		{ noise: 0.3, color: "#007700" },
		{ noise: 0.35, color: "#006600" },
		{ noise: 0.4, color: "#005500" },
		{ noise: 0.45, color: "#004c00" },
		{ noise: 0.5, color: "#004400" },
		{ noise: 0.55, color: "#003b00" },
		{ noise: 0.6, color: "#003300" },
		/**
		 * Hills (Extended Transition)
		 */
		{ noise: 0.65, color: "#778822" },
		{ noise: 0.7, color: "#889933" },
		{ noise: 0.75, color: "#99aa22" },
		{ noise: 0.8, color: "#aaa833" },
		{ noise: 0.85, color: "#bbb844" },
		{ noise: 0.875, color: "#cccc55" },
		{ noise: 0.9, color: "#dddd66" },
		/**
		 * Mountains (Vibrant Rocky Shades)
		 */
		{ noise: 0.925, color: "#666677" },
		{ noise: 0.95, color: "#777788" },
		{ noise: 0.975, color: "#888899" },
		{ noise: 0.99, color: "#aaaaaa" },
		{ noise: 1.0, color: "#ffffff" },
	].sort((a, b) => b.noise - a.noise),
	layers: [
		{
			min: 0.065,
			max: 1,
			level: 1,
			offset: 4,
		},
		{
			min: 0.035,
			max: 0.065,
			level: 2,
			offset: 4,
		},
		{
			min: 0.01,
			max: 0.035,
			level: 4,
			offset: 4,
		},
		{
			min: 0.005,
			max: 0.01,
			level: 16,
			offset: 4,
		},
		{
			min: 0.001,
			max: 0.005,
			level: 128,
			offset: 4,
		},
	],
};
