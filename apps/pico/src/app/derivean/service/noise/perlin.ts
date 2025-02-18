import { FastNoiseLite } from "@use-pico/common";
import { createNoise } from "~/app/derivean/service/noise/createNoise";

export const perlin = (seed: string) => {
	const noise = createNoise({ seed });
	noise.SetNoiseType(FastNoiseLite.NoiseType.Perlin);
	noise.SetDomainWarpType(FastNoiseLite.DomainWarpType.OpenSimplex2);
	noise.SetDomainWarpAmp(25);
	noise.SetFractalType(FastNoiseLite.FractalType.PingPong);
	noise.SetFractalOctaves(4);
	noise.SetFractalLacunarity(2.75);
	noise.SetFractalPingPongStrength(2.25);

	return (x: number, z: number) => {
		return noise.GetNoise(x, z);
	};
};
