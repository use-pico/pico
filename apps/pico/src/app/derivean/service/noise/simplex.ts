import { FastNoiseLite } from "@use-pico/common";
import { createNoise } from "~/app/derivean/service/noise/createNoise";

export const simplex = (seed: string) => {
	const noise = createNoise({ seed });
	noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
	noise.SetFractalType(FastNoiseLite.FractalType.PingPong);

	return (x: number, z: number) => {
		return noise.GetNoise(x, z);
	};
};
