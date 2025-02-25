import type { Biome } from "~/app/derivean/type/Biome";

export const BeachBiome: Biome = {
	name: "Beach",
	color: [60, 100, 50, 1],
	weight: 20,
	colorMap: {
		heightmap: [],
		temperature: [],
		moisture: [],
	},
	neighbors: {
		Beach: 30,
		Ocean: 10,
	},
	noise() {
		return {
			heightmap: () => 0,
			temperature: () => 0,
			moisture: () => 0,
		};
	},
};
