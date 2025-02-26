import type { Color } from "~/app/derivean/type/Color";
import type { NoiseType } from "~/app/derivean/type/NoiseType";

/**
 * Defines noise input for a color output.
 */
export interface NoiseColor extends Partial<Record<NoiseType, number>> {
	color: Color;
}
