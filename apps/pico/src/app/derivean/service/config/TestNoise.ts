import { blend } from "~/app/derivean/service/noise/blend";
import { createNoise } from "~/app/derivean/service/noise/createNoise";
import { withNoise } from "~/app/derivean/service/noise/withNoise";
import type { NoiseFactory } from "~/app/derivean/type/NoiseFactory";

export const TestNoise: NoiseFactory = (seed) => {
	return withNoise({
		seed,
		layers: [
			{
				disabled: true,
				name: "base-level",
				scale: 1,
				weight: 1.5,
				noise(seed) {
					const sourceNoise = createNoise({
						seed,
						frequency: 0.025,
						type: "Perlin",
						fractal: {
							type: "FBm",
							octaves: 2,
							gain: 0.5,
							lacunarity: 2.125,
						},
					});
					const controlNoise = createNoise({
						seed,
						frequency: 0.0125,
						type: "OpenSimplex2S",
					});

					return (x, z) =>
						blend({
							x,
							z,
							sourceNoise,
							controlNoise,
						});
				},
			},
			{
				// disabled: true,
				name: "base-detail",
				scale: 0.25,
				weight: 1.5,
				noise(seed) {
					const sourceNoise = createNoise({
						seed,
						frequency: 0.05,
						type: "OpenSimplex2S",
						fractal: {
							type: "FBm",
							octaves: 2,
							gain: 0.5,
							lacunarity: 2.125,
						},
					});
					const controlNoise = createNoise({
						seed,
						frequency: 0.025,
						type: "Perlin",
					});

					return (x, z) =>
						blend({
							x,
							z,
							sourceNoise,
							controlNoise,
						});
				},
			},
			{
				// disabled: true,
				name: "base-flat",
				scale: 0.0025,
				weight: 4,
				noise(seed) {
					return createNoise({ seed, type: "Value" });
				},
			},
		],
	});
};
