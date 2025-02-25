import type { Color } from "~/app/derivean/type/Color";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";
import type { NoiseSource } from "~/app/derivean/type/NoiseSource";

/**
 * Each biome has it's own colormap and noise sources.
 */
export interface Biome {
	/**
	 * Biome name so human can understand it.
	 */
	name: string;
	/**
	 * Color map for this biome.
	 */
	colorMap: NoiseColorMap;
	/**
	 * Marker color for this biome, it's more used for debugging purposes.
	 *
	 * HSLA color.
	 */
	color: Color;
	/**
	 * Source noise for this biome.
	 */
	noise: NoiseSource;
	/**
	 * Weight of this biome in the biome list.
	 */
	weight: number;
}
