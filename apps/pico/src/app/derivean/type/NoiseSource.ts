import type { Noise } from "~/app/derivean/type/Noise";
import type { NoiseType } from "~/app/derivean/type/NoiseType";

/**
 * Define individual noises to make up a biome.
 */
export type NoiseSource = ({
	seed,
}: {
	seed: string;
}) => Record<NoiseType, Noise>;
