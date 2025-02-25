import type { NoiseColor } from "~/app/derivean/type/NoiseColor";
import type { NoiseType } from "~/app/derivean/type/NoiseType";

/**
 * Defines structure of a color map used to generate chunk texture.
 */
export type NoiseColorMap = Record<NoiseType, NoiseColor[]>;
