import type { Color } from "~/app/derivean/type/Color";

/**
 * Defines noise input for a color output.
 */
export interface NoiseColor {
	/**
	 * Noise level range (min, max).
	 */
	level: [number, number];
	/**
	 * Color used as output for this noise level.
	 */
	color: Color.HSLA;
}
