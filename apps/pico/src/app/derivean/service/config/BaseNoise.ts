import { blend } from "~/app/derivean/service/noise/blend";
import { createNoise } from "~/app/derivean/service/noise/createNoise";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

export const BaseNoise: withNoise.NoiseFactory = (seed) => {
	return withNoise({
		seed,
		layers: [
			{
				name: "base",
				scale: 1,
				noise(seed) {
					const sourceNoise = createNoise({
						seed,
						frequency: 0.05,
						type: "Cellular",
						cellular: {
							distanceFunction: "Euclidean",
							returnType: "CellValue",
						},
						fractal: {
							type: "FBm",
							octaves: 4,
						},
					});
					const controlNoise = createNoise({
						seed,
						frequency: 0.005,
						type: "Cellular",
						cellular: {
							distanceFunction: "Euclidean",
							returnType: "CellValue",
						},
					});

					return (x, z) =>
						blend({
							x,
							z,
							scale: [0.45, 0.55],
							limit: [0.25, 0.75],
							sourceNoise,
							controlNoise,
						});
				},
			},
			{
				// disabled: true,
				name: "detail",
				scale: 0.25,
				weight: 1.5,
				noise(seed) {
					const sourceNoise = createNoise({
						seed,
						frequency: 0.025,
						type: "Cellular",
						cellular: {
							distanceFunction: "EuclideanSq",
							returnType: "CellValue",
						},
						fractal: {
							type: "FBm",
							octaves: 4,
						},
					});
					const controlNoise = createNoise({
						seed,
						frequency: 0.05,
						type: "Cellular",
						cellular: {
							distanceFunction: "EuclideanSq",
							returnType: "CellValue",
						},
						fractal: {
							type: "Ridged",
							octaves: 2,
						},
					});

					return (x, z) =>
						blend({
							x,
							z,
							scale: [0.4, 0.6],
							limit: [0.25, 0.75],
							sourceNoise,
							controlNoise,
						});
				},
			},
		],
	});
};
