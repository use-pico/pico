import { FastNoiseLite } from "@use-pico/common";
import { createNoise } from "~/app/derivean/service/noise/createNoise";
import { cubic } from "~/app/derivean/service/noise/cubic";
import { perlin } from "~/app/derivean/service/noise/perlin";
import { warp } from "~/app/derivean/service/noise/warp";
import type { withNoise } from "~/app/derivean/service/noise/withNoise";

export const HeightmapNoise = {
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
	simplex: ((seed) => {
		const noise = createNoise({ seed });
		noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2S);
		noise.SetFractalType(FastNoiseLite.FractalType.PingPong);
		noise.SetFractalOctaves(6);
		noise.SetFractalWeightedStrength(-0.75);

		return (x: number, z: number) => {
			return noise.GetNoise(x, z);
		};
	}) satisfies withNoise.NoiseFactory,
	perlin: ((seed) => {
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
	}) satisfies withNoise.NoiseFactory,
	perlinWarpX: ((seed) => {
		return warp({ noise: perlin(seed), offsetX: 5 });
	}) satisfies withNoise.NoiseFactory,
	cubicWarpX: ((seed) => {
		return warp({ noise: cubic(seed), offsetX: 5 });
	}) satisfies withNoise.NoiseFactory,
	cellular: ((seed) => {
		const noise = createNoise({ seed });
		noise.SetNoiseType(FastNoiseLite.NoiseType.Cellular);
		noise.SetCellularDistanceFunction(
			FastNoiseLite.CellularDistanceFunction.EuclideanSq,
		);
		noise.SetCellularReturnType(FastNoiseLite.CellularReturnType.Distance);

		return (x: number, z: number) => {
			return noise.GetNoise(x, z);
		};
	}) satisfies withNoise.NoiseFactory,
	pingPongCellular: ((seed) => {
		const noise = createNoise({ seed });
		noise.SetNoiseType(FastNoiseLite.NoiseType.Cellular);
		noise.SetCellularDistanceFunction(
			FastNoiseLite.CellularDistanceFunction.Hybrid,
		);
		noise.SetCellularReturnType(FastNoiseLite.CellularReturnType.Distance2Add);
		noise.SetFractalType(FastNoiseLite.FractalType.PingPong);
		noise.SetFractalOctaves(4);

		return (x: number, z: number) => {
			return noise.GetNoise(x, z);
		};
	}) satisfies withNoise.NoiseFactory,
} as const;
