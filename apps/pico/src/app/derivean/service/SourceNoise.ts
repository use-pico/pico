import { blend } from "~/app/derivean/service/generator/noise/blend";
import { createNoise } from "~/app/derivean/service/generator/noise/createNoise";
import { withNoise } from "~/app/derivean/service/generator/noise/withNoise";
import type { NoiseSource } from "~/app/derivean/type/NoiseSource";

export const SourceNoise: NoiseSource = ({ seed }) => {
	return {
		biome: withNoise({
			seed: `${seed}-biome`,
			layers: [
				{
					name: "base-cellular",
					scale: 1,
					weight: 2,
					noise(seed) {
						return createNoise({
							seed,
							frequency: 0.125,
							type: "Cellular",
							cellular: {
								distanceFunction: "Euclidean",
								returnType: "CellValue",
							},
						});
					},
				},
				{
					name: "base-cellular",
					scale: 1,
					weight: 1,
					inverse: true,
					noise(seed) {
						return createNoise({
							seed,
							frequency: 0.125,
							type: "Cellular",
							cellular: {
								distanceFunction: "Euclidean",
								returnType: "CellValue",
							},
						});
					},
				},
			],
			variation: [],
		}),
		heightmap: withNoise({
			seed: `${seed}-heightmap`,
			layers: [
				{
					name: "base-large-scale",
					scale: 0.65,
					noise(seed) {
						const sourceNoise1 = createNoise({
							seed,
							frequency: 0.025,
							type: "Cellular",
							cellular: {
								distanceFunction: "EuclideanSq",
								returnType: "Distance2Sub",
							},
							fractal: {
								type: "PingPong",
								octaves: 4,
							},
						});
						const sourceNoise2 = createNoise({
							seed,
							frequency: 0.05,
							type: "OpenSimplex2S",
							fractal: {
								type: "FBm",
								octaves: 2,
							},
						});
						const controlNoise = createNoise({
							seed,
							frequency: 0.05,
							type: "ValueCubic",
							fractal: {
								type: "PingPong",
								octaves: 8,
								gain: 0.75,
							},
						});

						return (x, z) =>
							blend({
								x,
								z,
								scale: [0.45, 0.55],
								limit: [0.35, 0.65],
								sourceNoise: (x, z) =>
									blend({
										x,
										z,
										scale: [0.45, 0.55],
										limit: [0.25, 0.75],
										sourceNoise: sourceNoise2,
										controlNoise: sourceNoise1,
									}),
								controlNoise,
							});
					},
				},
				{
					// disabled: true,
					name: "detail",
					scale: 0.25,
					weight: 1,
					inverse: true,
					noise(seed) {
						const sourceNoise = createNoise({
							seed,
							frequency: 0.05,
							type: "OpenSimplex2S",
							fractal: {
								type: "PingPong",
								octaves: 8,
							},
						});
						const controlNoise = createNoise({
							seed,
							frequency: 0.075,
							type: "Cellular",
							cellular: {
								distanceFunction: "EuclideanSq",
								returnType: "Distance",
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
		}),
		temperature: withNoise({
			seed: `${seed}-temperature`,
			layers: [
				{
					name: "base-large-scale",
					scale: 0.25,
					noise(seed) {
						const controlNoise = createNoise({
							seed,
							frequency: 0.075,
							type: "Cellular",
							cellular: {
								distanceFunction: "EuclideanSq",
								returnType: "Distance2Sub",
							},
							fractal: {
								type: "PingPong",
								octaves: 4,
							},
						});
						const sourceNoise = createNoise({
							seed,
							frequency: 0.25,
							type: "ValueCubic",
							fractal: {
								type: "PingPong",
								octaves: 4,
								gain: 0.75,
							},
						});

						return (x, z) =>
							blend({
								x,
								z,
								scale: [0.45, 0.55],
								limit: [0.4, 0.6],
								sourceNoise,
								controlNoise,
							});
					},
				},
				{
					disabled: true,
					name: "detail",
					scale: 0.25,
					weight: 1,
					inverse: true,
					noise(seed) {
						const sourceNoise = createNoise({
							seed,
							frequency: 0.05,
							type: "OpenSimplex2S",
							fractal: {
								type: "PingPong",
								octaves: 8,
							},
						});
						const controlNoise = createNoise({
							seed,
							frequency: 0.075,
							type: "Cellular",
							cellular: {
								distanceFunction: "EuclideanSq",
								returnType: "Distance",
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
		}),
		moisture: withNoise({
			seed: `${seed}-moisture`,
			layers: [
				{
					name: "default",
					scale: 1,
					noise(seed) {
						return createNoise({
							seed,
							type: "OpenSimplex2S",
							frequency: 0.025,
							fractal: {
								type: "FBm",
								octaves: 4,
							},
						});
					},
				},
			],
			variation: [],
		}),
		shade: withNoise({
			seed: `${seed}-shade`,
			layers: [
				{
					name: "default",
					scale: 1,
					noise(seed) {
						return createNoise({
							seed,
							type: "OpenSimplex2S",
							frequency: 0.05,
							fractal: {
								type: "FBm",
								octaves: 8,
							},
						});
					},
				},
			],
			variation: [],
		}),
	};
};
