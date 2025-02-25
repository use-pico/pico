import { FastNoiseLite } from "@use-pico/common";
import type { GameConfig } from "~/app/derivean/GameConfig";
import { createStops } from "~/app/derivean/service/createStops";
import { blend } from "~/app/derivean/service/noise/blend";
import { createNoise } from "~/app/derivean/service/noise/createNoise";
import { perlin } from "~/app/derivean/service/noise/perlin";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

export const GreenlandBiome: GameConfig.Biome = {
	name: "Greenland",
	weight: 1,
	colorMap: {
		heightmap: createStops({
			limit: [-1, 1],
			steps: 50,
			hueRange: [90, 150],
			saturationRange: [40, 85],
			lightnessRange: [35, 75],
		}),

		// Biome: Subtle mod offsets to adjust the intrinsic grass tone.
		// These values (delta saturation/lightness) are low so that when added they tweak the base green ever so slightly.
		biome: [
			{ noise: -1.0, color: [0, -5, -3, 0.05] },
			{ noise: -0.5, color: [0, -3, -2, 0.05] },
			{ noise: 0.0, color: [0, 0, 0, 0] },
			{ noise: 0.5, color: [0, 3, 2, 0.05] },
			{ noise: 1.0, color: [0, 5, 3, 0.05] },
		].sort((a, b) => b.noise - a.noise) as GameConfig.Color[],

		// Temperature: 51 stops of HSLA mod offsets.
		// For noise > 0, we apply a slight warm offset (subtracting from the base hue of 120, nudging toward yellow–green).
		// For noise < 0, we add a slight cool offset (adding to the base hue, nudging toward blue–green).
		temperature: Array.from({ length: 51 }, (_, i) => {
			const noise = 1 - (i * 2) / 50;
			let deltaHue: number, deltaSat: number, deltaLight: number, alpha: number;
			if (noise > 0) {
				// Warm: subtract up to 5° from the base hue, add a subtle saturation boost.
				deltaHue = -5 * noise;
				deltaSat = 2 * noise;
				deltaLight = 0;
				alpha = 0.05 * noise;
			} else if (noise < 0) {
				// Cool: add up to 5° to the base hue, again with a subtle saturation boost.
				const absNoise = Math.abs(noise);
				deltaHue = 5 * absNoise;
				deltaSat = 2 * absNoise;
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

		// Moisture: Mod offsets to simulate a shift from dry (a tad muted) to wet (a bit more vibrant).
		// The values are kept low so that the base green remains dominant.
		moisture: [
			{ noise: -1.0, color: [0, -4, -3, 0.05] },
			{ noise: -0.5, color: [0, -2, -1, 0.05] },
			{ noise: 0.0, color: [0, 0, 0, 0] },
			{ noise: 0.5, color: [0, 2, 1, 0.05] },
			{ noise: 1.0, color: [0, 4, 3, 0.05] },
		].sort((a, b) => b.noise - a.noise) as GameConfig.Color[],
	},
	noise({ seed }) {
		const noise = {
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
			blend: ((seed) => {
				const sourceNoise = perlin(`${seed}-source`);
				const controlNoise = perlin(`${seed}-control`);

				return (x: number, z: number) => {
					return blend({
						x,
						z,
						scale: [0.25, 0.6],
						limit: [0.45, 0.55],
						sourceNoise,
						controlNoise,
					});
				};
			}) satisfies withNoise.NoiseFactory,
		} as const;

		return {
			heightmap: withNoise({
				seed: `${seed}-greenland-heightmap`,
				noise,
				layers: [
					{
						// disabled: true,
						name: "base",
						noise: "blend",
						scale: 0.025,
					},
				],
			}),
			biome: withNoise({
				seed: `${seed}-greenland-biome`,
				noise,
				layers: [
					{
						// disabled: true,
						name: "base",
						noise: "cubic",
						scale: 1.5,
					},
				],
			}),
			temperature: withNoise({
				seed: `${seed}-greenland-temperature`,
				noise,
				layers: [
					{
						// disabled: true,
						name: "base",
						noise: "cubic",
						scale: 0.05,
					},
				],
			}),
			moisture: withNoise({
				seed: `${seed}-greenland-moisture`,
				noise,
				layers: [
					{
						// disabled: true,
						name: "base",
						noise: "cubic",
						scale: 1,
					},
				],
			}),
		};
	},
};
