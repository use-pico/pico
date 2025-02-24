import { FastNoiseLite } from "@use-pico/common";
import type { GameConfig } from "~/app/derivean/GameConfig";
import { createNoise } from "~/app/derivean/service/noise/createNoise";
import { withNoise } from "~/app/derivean/service/noise/withNoise";

export const OceanBiome: GameConfig.Biome = {
	name: "Ocean",
	weight: 0.75,
	colorMap: {
		// Water Heightmap: A gradient from deep water to shallow water.
		// Here noise=-1 corresponds to deep water and noise=1 to shallow water.
		heightmap: Array.from({ length: 21 }, (_, i) => {
			const noise = -1 + (i * 2) / 20;
			const t = (noise + 1) / 2;
			// Interpolate hue from 210° (deep) to 200° (shallow)
			const hue = 210 + (200 - 210) * t;
			// Interpolate saturation from 80% (deep) to 50% (shallow)
			const saturation = 80 + (50 - 80) * t;
			// Interpolate lightness from 20% (deep) to 80% (shallow)
			const lightness = 20 + (80 - 20) * t;
			return {
				noise,
				color: [hue, saturation, lightness, 1],
			} as GameConfig.Color;
		}).sort((a, b) => b.noise - a.noise),

		// Biome: Subtle mod offsets to simulate variations (e.g. open ocean vs. coastal water)
		biome: [
			{ noise: -1.0, color: [0, 2, -3, 0.05] },
			{ noise: -0.5, color: [0, 1, -2, 0.05] },
			{ noise: 0.0, color: [0, 0, 0, 0] },
			{ noise: 0.5, color: [0, -1, 2, 0.05] },
			{ noise: 1.0, color: [0, -2, 3, 0.05] },
		].sort((a, b) => b.noise - a.noise) as GameConfig.Color[],

		// Temperature: 51 stops of subtle HSLA offsets.
		// For noise > 0 (warmer water) we subtract a few degrees (nudging the hue slightly lower),
		// while for noise < 0 (colder water) we add a few degrees.
		temperature: Array.from({ length: 51 }, (_, i) => {
			const noise = 1 - (i * 2) / 50;
			let deltaHue: number, deltaSat: number, deltaLight: number, alpha: number;
			if (noise > 0) {
				deltaHue = -5 * noise;
				deltaSat = 1 * noise;
				deltaLight = 0;
				alpha = 0.05 * noise;
			} else if (noise < 0) {
				const absNoise = Math.abs(noise);
				deltaHue = 5 * absNoise;
				deltaSat = 1 * absNoise;
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
		} as const;

		return {
			heightmap: withNoise({
				seed: `${seed}-ocean-heightmap`,
				noise,
				layers: [
					{
						// disabled: true,
						name: "base",
						noise: "cubic",
						scale: 0.025,
					},
				],
			}),
			biome: withNoise({
				seed: `${seed}-ocean-biome`,
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
				seed: `${seed}-ocean-temperature`,
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
				seed: `${seed}-ocean-moisture`,
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
