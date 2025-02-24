import { FastNoiseLite } from "@use-pico/common";
import { createNoise } from "~/app/derivean/service/noise/createNoise";
import type { withNoise } from "~/app/derivean/service/noise/withNoise";

export const MoistureNoise = {
	cubic: ((seed) => {
		const noise = createNoise({ seed });
		noise.SetNoiseType(FastNoiseLite.NoiseType.ValueCubic);
		noise.SetFractalType(FastNoiseLite.FractalType.PingPong);
		noise.SetFractalOctaves(6);
		noise.SetFractalWeightedStrength(-0.75);

		return (x: number, z: number) => {
			return noise.GetNoise(x, z);
		};
	}) satisfies withNoise.NoiseFactory,
} as const;
