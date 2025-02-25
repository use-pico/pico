import { createStops } from "~/app/derivean/service/generator/createStops";
import { blend } from "~/app/derivean/service/generator/noise/blend";
import { createNoise } from "~/app/derivean/service/generator/noise/createNoise";
import { withNoise } from "~/app/derivean/service/generator/noise/withNoise";
import type { Biome } from "~/app/derivean/type/Biome";

export const OceanBiome: Biome = {
	name: "Ocean",
	colorMap: {
		// Water Heightmap: A gradient from deep water to shallow water.
		// Here noise=-1 corresponds to deep water and noise=1 to shallow water.
		heightmap: createStops({
			steps: 21,
			limit: [-1, 1],
			hueRange: [210, 200],
			saturationRange: [80, 50],
			lightnessRange: [20, 80],
		}),
		temperature: [],
		moisture: [],
	},
	noise({ seed }) {
		return {
			heightmap: withNoise({
				seed: `${seed}-ocean-heightmap`,
				layers: [
					{
						// disabled: true,
						name: "base",
						noise(seed) {
							return createNoise({ seed });
						},
						scale: 0.025,
					},
					{
						// disabled: true,
						name: "base",
						noise(seed) {
							const sourceNoise = createNoise({
								seed: `${seed}-source`,
								type: "ValueCubic",
							});
							const controlNoise = createNoise({
								seed: `${seed}-control`,
								cellular: {
									distanceFunction: "EuclideanSq",
									returnType: "Distance2",
								},
							});

							return (x: number, z: number) => {
								return blend({
									x,
									z,
									scale: [0.5, 1],
									limit: [0.45, 0.55],
									sourceNoise,
									controlNoise,
								});
							};
						},
						scale: 0.5,
					},
				],
			}),
			biome: withNoise({
				seed: `${seed}-ocean-biome`,
				layers: [
					{
						// disabled: true,
						name: "base",
						noise(seed) {
							return createNoise({ seed });
						},
						scale: 1.5,
					},
				],
			}),
			temperature: withNoise({
				seed: `${seed}-ocean-temperature`,
				layers: [
					{
						// disabled: true,
						name: "base",
						noise(seed) {
							return createNoise({ seed });
						},
						scale: 0.05,
					},
				],
			}),
			moisture: withNoise({
				seed: `${seed}-ocean-moisture`,
				layers: [
					{
						// disabled: true,
						name: "base",
						noise(seed) {
							return createNoise({ seed });
						},
						scale: 1,
					},
				],
			}),
		};
	},
};
