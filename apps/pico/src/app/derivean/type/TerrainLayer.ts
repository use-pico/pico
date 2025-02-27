import type { Color } from "~/app/derivean/type/Color";

/**
 * Defines a single terrain layer for color map generation
 */
export interface TerrainLayer {
	/**
	 * Name of the terrain layer (e.g., "deep-ocean", "mountains")
	 */
	name: string;

	/**
	 * Base color in HSLA format to use for this layer
	 */
	color: Color.HSLA;

	/**
	 * Length/range of noise values this layer covers (e.g., 0.25)
	 */
	length: number;

	/**
	 * Number of color steps to generate within this range
	 * Higher values create smoother gradients
	 */
	steps: number;
}
