import { createNoise } from "~/app/derivean/service/generator/noise/createNoise";
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
							type: "OpenSimplex2",
							fractal: {
								type: "FBm",
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
							type: "OpenSimplex2",
							fractal: {
								type: "FBm",
								octaves: 2,
							},
						});
					},
				},
			],
		}),

		/**
		 * Heightmap - focused on realistic terrain formation
		 * Enhanced with multiple layers to create varied terrain
		 */
		heightmap: withNoise({
			seed: `${seed}-heightmap`,
			layers: [
				{
					name: "base-terrain",
					scale: 1,
					noise(seed) {
						const baseNoise = createNoise({
							seed,
							frequency: 0.03,
							type: "OpenSimplex2",
							fractal: {
								type: "FBm",
								octaves: 4,
								lacunarity: 2.0,
								gain: 0.5,
							},
						});

						// Add ridged noise for mountain ranges
						const ridgeNoise = createNoise({
							seed: `${seed}-ridge`,
							frequency: 0.06,
							type: "OpenSimplex2",
							fractal: {
								type: "Ridged",
								octaves: 3,
								gain: 0.6,
							},
						});

						// Blend for natural terrain
						return (x, z) => {
							const base = baseNoise(x, z) * 0.7;
							const ridge = ridgeNoise(x, z) * 0.5;

							// Add more extreme height to create mountains
							return base + ridge * ridge * Math.sign(ridge);
						};
					},
				},
				{
					name: "erosion",
					scale: 3,
					weight: 0.2,
					noise(seed) {
						return createNoise({
							seed,
							frequency: 0.1,
							type: "OpenSimplex2",
							fractal: {
								type: "FBm",
								octaves: 2,
							},
						});
					},
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
									type: "OpenSimplex2",
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
							type: "OpenSimplex2",
							fractal: {
								type: "FBm",
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
							type: "OpenSimplex2",
							fractal: {
								type: "FBm",
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
							type: "OpenSimplex2",
							fractal: {
								type: "FBm",
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
							type: "OpenSimplex2",
							fractal: {
								type: "FBm",
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
