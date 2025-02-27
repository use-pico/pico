import { FastNoiseLite } from "@use-pico/common";
import { flow } from "fp-ts/function";
import { fpClamp } from "~/app/derivean/fp/fpClamp";
import { fpCombineNoise } from "~/app/derivean/fp/fpCombineNoise";
import { fpScaleXZ } from "~/app/derivean/fp/fpScaleXZ";
import { fpWeight } from "~/app/derivean/fp/fpWeight";
import { blend } from "~/app/derivean/service/generator/noise/blend";
import { createNoise } from "~/app/derivean/service/generator/noise/createNoise";
import { withNoise } from "~/app/derivean/service/generator/noise/withNoise";
import type { NoiseSource } from "~/app/derivean/type/NoiseSource";

export const SourceNoise: NoiseSource = ({ seed }) => {
	return {
		/**
		 * Heightmap - focused on realistic terrain formation
		 * Designed for multi-scale viewing with varied continent and island sizes
		 */
		heightmap: flow(
			fpScaleXZ({ scale: 1 }),
			flow(
				fpCombineNoise({
					noise1: {
						noise: blend({
							scale: [2, 5],
							limit: [0.2, 0.8],
							sourceNoise: createNoise({
								seed: `${seed}-heightmap-1`,
								frequency: 0.01,
								type: "Value",
								fractal: {
									type: "FBm",
									gain: 0.25,
									lacunarity: 4,
									octaves: 28,
									weightedStrength: 2.5,
								},
							}),
							controlNoise: createNoise({
								seed: `${seed}-heightmap-2`,
								frequency: 0.01,
								type: "ValueCubic",
								fractal: {
									type: "FBm",
									gain: 0.5,
									lacunarity: 2.5,
									octaves: 64,
									weightedStrength: 0.5,
								},
							}),
						}),
						weight: 1,
					},
					noise2: {
						noise: flow(
							createNoise({
								seed: `${seed}-heightmap-3`,
								frequency: 0.005,
								type: "ValueCubic",
								fractal: {
									type: "FBm",
									gain: 0.75,
									lacunarity: 2.5,
									octaves: 32,
									weightedStrength: 0.5,
								},
							}),
							fpClamp({ min: -1, max: 0 }),
						),
						weight: 1,
					},
				}),
			),
			fpWeight({ weight: 1.5 }),
			fpClamp({ min: -1, max: 1 }),
		),

		/**
		 * Biome noise - larger-scale pattern to identify major regions
		 * This noise defines the broader biome distribution pattern
		 * Less variation than before, more gradual transitions
		 */
		biome: flow(
			fpScaleXZ({ scale: 0.5 }),
			flow(
				createNoise({
					seed: `${seed}-biome`,
					frequency: 1,
					type: "OpenSimplex2S",
				}),
			),
		),

		/**
		 * Temperature - gradual from poles to equator with local variation
		 */
		temperature: flow(
			createNoise({
				seed: `${seed}-temperature`,
				type: "ValueCubic",
				frequency: 0.075,
			}),
			fpWeight({ weight: 1.5 }),
		),

		/**
		 * Moisture - simulates rainfall patterns with coastal effects
		 */
		moisture: withNoise({
			seed: `${seed}-moisture`,
			layers: [
				{
					name: "base-moisture",
					scale: 0.8,
					weight: 1,
					noise(seed) {
						return createNoise({
							seed,
							frequency: 0.05,
							type: FastNoiseLite.NoiseType.OpenSimplex2,
							fractal: {
								type: FastNoiseLite.FractalType.FBm,
								octaves: 3,
								lacunarity: 2.0,
								gain: 0.6,
							},
						});
					},
				},
				{
					name: "local-humidity",
					scale: 2,
					weight: 0.4,
					noise(seed) {
						return createNoise({
							seed,
							frequency: 0.08,
							type: FastNoiseLite.NoiseType.OpenSimplex2,
							fractal: {
								type: FastNoiseLite.FractalType.FBm,
								octaves: 2,
							},
						});
					},
				},
			],
		}),

		/**
		 * Shade - subtle local variations to break up uniformity
		 */
		shade: withNoise({
			seed: `${seed}-shade`,
			layers: [
				{
					name: "microvariation",
					scale: 5,
					weight: 1,
					noise(seed) {
						return createNoise({
							seed,
							frequency: 0.2,
							type: FastNoiseLite.NoiseType.OpenSimplex2,
							fractal: {
								type: FastNoiseLite.FractalType.FBm,
								octaves: 2,
								gain: 0.4,
							},
						});
					},
				},
			],
		}),
	};
};
