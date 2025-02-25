import type { GameConfig } from "~/app/derivean/GameConfig";
import { createStops } from "~/app/derivean/service/createStops";
import { blend } from "~/app/derivean/service/noise/blend";
import { createNoise } from "~/app/derivean/service/noise/createNoise";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

export const OceanBiome: GameConfig.Biome = {
	name: "Ocean",
	weight: 1.25,
	colorMap: {
		// Water Heightmap: A gradient from deep water to shallow water.
		// Here noise=-1 corresponds to deep water and noise=1 to shallow water.
		heightmap: createStops({
			steps: 21,
			limit: [-1, -0.75],
			hueRange: [210, 200],
			saturationRange: [80, 50],
			lightnessRange: [20, 80],
		}),

		// Temperature: 51 stops of subtle HSLA offsets.
		// For noise > 0 (warmer water) we subtract a few degrees (nudging the hue slightly lower),
		// while for noise < 0 (colder water) we add a few degrees.
		temperature: Array.from({ length: 51 }, (_, i) => {
			const noise = 1 - (i * 2) / 50;
			let deltaHue: number, deltaSat: number, deltaLight: number, alpha: number;
			if (noise > 0) {
				deltaHue = -5 * noise;
				deltaSat = noise;
				deltaLight = 0;
				alpha = 0.05 * noise;
			} else if (noise < 0) {
				const absNoise = Math.abs(noise);
				deltaHue = 5 * absNoise;
				deltaSat = absNoise;
				deltaLight = 0;
				alpha = 0.05 * absNoise;
			} else {
				deltaHue = deltaSat = deltaLight = alpha = 0;
			}
			return {
				noise,
				color: [deltaHue, deltaSat, deltaLight, alpha],
			} as GameConfig.Color;
		}).sort((a, b) => b.noise - a.noise),

		// Moisture: Subtle mod offsets to simulate differences in water clarity or turbidity.
		moisture: [
			{ noise: -1.0, color: [0, 2, -2, 0.05] },
			{ noise: -0.5, color: [0, 1, -1, 0.05] },
			{ noise: 0.0, color: [0, 0, 0, 0] },
			{ noise: 0.5, color: [0, -1, 1, 0.05] },
			{ noise: 1.0, color: [0, -2, 2, 0.05] },
		].sort((a, b) => b.noise - a.noise) as GameConfig.Color[],
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
