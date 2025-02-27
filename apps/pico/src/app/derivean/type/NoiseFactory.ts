import type { Noise } from "~/app/derivean/type/Noise";

export type NoiseFactory = (seed: string) => Noise;
