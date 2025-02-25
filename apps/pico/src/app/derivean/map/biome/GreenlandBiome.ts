import { createStops } from "~/app/derivean/service/generator/createStops";
import { blend } from "~/app/derivean/service/generator/noise/blend";
import { createNoise } from "~/app/derivean/service/generator/noise/createNoise";
import { withNoise } from "~/app/derivean/service/generator/noise/withNoise";
import type { Biome } from "~/app/derivean/type/Biome";

export const GreenlandBiome: Biome = {
	name: "Greenland",
	colorMap: {
		heightmap: createStops({
			limit: [-1, 1],
			steps: 50,
			hueRange: [90, 150],
			saturationRange: [0, 85],
			lightnessRange: [0, 50],
		}),
		temperature: [],
		moisture: [],
	},
	noise({ seed }) {
		return {
			heightmap: withNoise({
				seed: `${seed}-greenland-heightmap`,
				layers: [
					{
						// disabled: true,
						name: "base",
						noise(seed) {
							const sourceNoise = createNoise({
								seed: `${seed}-source`,
								type: "Perlin",
								// cellular: {
								// 	distanceFunction: "Hybrid",
								// 	returnType: "Distance2",
								// },
								fractal: {
									type: "PingPong",
									octaves: 3,
									lacunarity: 2,
									gain: 0.5,
									weightedStrength: 0,
								},
							});
							const controlNoise = createNoise({
								seed: `${seed}-control`,
								cellular: {
									distanceFunction: "Hybrid",
									returnType: "Distance2Div",
								},
								fractal: {
									type: "PingPong",
									octaves: 3,
									lacunarity: 2,
									gain: 0.5,
									weightedStrength: 0,
								},
							});

							return (x: number, z: number) => {
								return blend({
									x,
									z,
									scale: [0.25, 0.5],
									limit: [0.45, 0.55],
									sourceNoise,
									controlNoise,
								});
							};
						},
						scale: 0.25,
					},
				],
			}),
			biome: withNoise({
				seed: `${seed}-greenland-biome`,
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
				seed: `${seed}-greenland-temperature`,
				layers: [
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
						scale: 0.05,
					},
				],
			}),
			moisture: withNoise({
				seed: `${seed}-greenland-moisture`,
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
