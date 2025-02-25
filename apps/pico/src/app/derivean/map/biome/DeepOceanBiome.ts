import type { Biome } from "~/app/derivean/type/Biome";

export const DeepOceanBiome: Biome = {
	name: "DeepOcean",
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
