import type { Biome } from "~/app/derivean/type/Biome";

export const HillBiome: Biome = {
	name: "Hill",
	colorMap: {
		heightmap: [],
		temperature: [],
		moisture: [],
	},
	noise() {
		return {
			heightmap: () => 0,
			temperature: () => 0,
			moisture: () => 0,
		};
	},
};
