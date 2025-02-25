import { createStops } from "~/app/derivean/service/generator/createStops";
import { createNoise } from "~/app/derivean/service/generator/noise/createNoise";
import { withNoise } from "~/app/derivean/service/generator/noise/withNoise";
import type { Biome } from "~/app/derivean/type/Biome";

export const HillBiome: Biome = {
	name: "Hill",
	colorMap: {
		heightmap: createStops({
			steps: 21,
			limit: [-1, 1],
			hueRange: [160, 200],
			saturationRange: [80, 50],
			lightnessRange: [20, 80],
		}),
		temperature: [],
		moisture: [],
	},
	noise({ seed }) {
		return {
			heightmap: withNoise({
				seed,
				layers: [
					{
						name: "default",
						scale: 0.25,
						noise(seed) {
							return createNoise({ seed });
						},
					},
				],
			}),
			temperature: () => 0,
			moisture: () => 0,
		};
	},
};
