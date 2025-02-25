import type { Biome } from "~/app/derivean/type/Biome";

export const HillBiome: Biome = {
	name: "Hill",
	color: [60, 100, 50, 1],
	weight: 80,
	colorMap: {
		heightmap: [],
		temperature: [],
		moisture: [],
	},
	neighbors: {
		Grassland: 30,
		Beach: 30,
	},
	noise() {
		return {
			heightmap: () => 0,
			temperature: () => 0,
			moisture: () => 0,
		};
	},
};
