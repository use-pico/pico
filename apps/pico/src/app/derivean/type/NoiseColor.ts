import type { Color } from "~/app/derivean/type/Color";

export interface NoiseColor {
	/**
	 * Noise value input will generate...
	 */
	noise: number;
	/**
	 * ...this color value (HSLA).
	 */
	color: Color;
}
