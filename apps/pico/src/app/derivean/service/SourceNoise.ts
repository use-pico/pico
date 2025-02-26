import { FastNoiseLite } from "@use-pico/common";
import { createNoise } from "~/app/derivean/service/generator/noise/createNoise";
import { warp } from "~/app/derivean/service/generator/noise/warp";
import { withNoise } from "~/app/derivean/service/generator/noise/withNoise";
import type { NoiseSource } from "~/app/derivean/type/NoiseSource";

export const SourceNoise: NoiseSource = ({ seed }) => {
	return {
		/**
		 * Biome noise - larger-scale pattern to identify major regions
		 * This noise defines the broader biome distribution pattern
		 * Less variation than before, more gradual transitions
		 */
		biome: withNoise({
			seed: `${seed}-biome`,
			layers: [
				{
					name: "base-continental",
					scale: 0.5,
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
								gain: 0.5,
							},
						});
					},
				},
				{
					name: "detail",
					scale: 2,
					weight: 0.3,
					noise(seed) {
						return createNoise({
							seed,
							frequency: 0.1,
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
		 * Heightmap - focused on realistic terrain formation
		 * Designed for multi-scale viewing with varied continent and island sizes
		 */
		heightmap: withNoise({
			seed: `${seed}-heightmap`,
			layers: [
				{
					name: "continents",
					scale: 0.3,
					weight: 1.5,
					noise(seed) {
						// Create large-scale continent shapes
						const continentNoise = createNoise({
							seed,
							frequency: 0.008,
							type: FastNoiseLite.NoiseType.OpenSimplex2,
							fractal: {
								type: FastNoiseLite.FractalType.FBm,
								octaves: 6,
								lacunarity: 2.2,
								gain: 0.4,
							},
						});

						// Create a warped version to make the continents less blobby
						return warp({
							noise: continentNoise,
							offsetX: 1000,
							offsetZ: 2000,
						});
					},
				},
				{
					name: "landmasses",
					scale: 0.8,
					weight: 0.7,
					noise(seed) {
						// Create medium-scale landmasses and large islands
						return createNoise({
							seed,
							frequency: 0.02,
							type: FastNoiseLite.NoiseType.OpenSimplex2,
							fractal: {
								type: FastNoiseLite.FractalType.FBm,
								octaves: 5,
								lacunarity: 2.0,
								gain: 0.5,
							},
						});
					},
				},
				{
					name: "hills",
					scale: 2.0,
					weight: 0.3,
					noise(seed) {
						// Create terrain undulations and hills
						return createNoise({
							seed: `${seed}-hills`,
							frequency: 0.04,
							type: FastNoiseLite.NoiseType.OpenSimplex2,
							fractal: {
								type: FastNoiseLite.FractalType.FBm,
								octaves: 4,
								lacunarity: 2.0,
								gain: 0.5,
							},
						});
					},
				},
				{
					name: "mountains",
					scale: 2.5,
					weight: 0.25,
					noise(seed) {
						// Create ridged mountain ranges
						const ridgeNoise = createNoise({
							seed: `${seed}-mountains`,
							frequency: 0.05,
							type: FastNoiseLite.NoiseType.OpenSimplex2,
							fractal: {
								type: FastNoiseLite.FractalType.Ridged,
								octaves: 4,
								gain: 0.6,
								lacunarity: 2.1,
							},
						});

						return (x, z) => {
							const v = ridgeNoise(x, z);
							// Amplify positive values to create sharper mountain peaks
							return v > 0 ? v * v * 1.5 : v;
						};
					},
				},
				{
					name: "terrain-detail",
					scale: 6.0,
					weight: 0.15,
					noise(seed) {
						// Add small-scale terrain details
						return createNoise({
							seed,
							frequency: 0.1,
							type: FastNoiseLite.NoiseType.OpenSimplex2,
							fractal: {
								type: FastNoiseLite.FractalType.FBm,
								octaves: 3,
								gain: 0.4,
							},
						});
					},
				},
			],
			variation: [
				{
					name: "coastal-variation",
					weight: 0.4,
					min: -0.2,
					max: 0.2,
					layers: [
						{
							name: "coast-detail",
							scale: 5,
							noise(seed) {
								return createNoise({
									seed,
									frequency: 0.15,
									type: FastNoiseLite.NoiseType.OpenSimplex2,
									fractal: {
										type: FastNoiseLite.FractalType.FBm,
										octaves: 3,
										gain: 0.4,
									},
								});
							},
						},
					],
				},
				{
					name: "mountain-peaks",
					weight: 0.7,
					min: 0.7,
					max: 1.0,
					layers: [
						{
							name: "peak-detail",
							scale: 10,
							noise(seed) {
								return createNoise({
									seed,
									frequency: 0.3,
									type: FastNoiseLite.NoiseType.OpenSimplex2,
									fractal: {
										type: FastNoiseLite.FractalType.Ridged,
										octaves: 3,
										gain: 0.7,
									},
								});
							},
						},
					],
				},
			],
		}),

		/**
		 * Temperature - gradual from poles to equator with local variation
		 */
		temperature: withNoise({
			seed: `${seed}-temperature`,
			layers: [
				{
					name: "latitude",
					scale: 0.2,
					weight: 1,
					noise(seed) {
						// Create a simple gradient primarily influenced by z coordinate
						// This simulates latitude temperature variation
						return (x, z) => {
							// Start with basic latitude gradient (north-south)
							const temp = Math.sin(z * 0.02) * 0.8;

							// Add some east-west variation
							const eastWestVariation =
								createNoise({
									seed,
									frequency: 0.01,
									type: FastNoiseLite.NoiseType.OpenSimplex2,
								})(x, z) * 0.2;

							return temp + eastWestVariation;
						};
					},
				},
				{
					name: "local-variation",
					scale: 2,
					weight: 0.25,
					noise(seed) {
						return createNoise({
							seed,
							frequency: 0.07,
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
