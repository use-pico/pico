import type { Biome } from "~/app/derivean/type/Biome";

export const DeepOceanBiome: Biome = {
	name: "DeepOcean",
	color: [200, 20, 40, 1],
	weight: 50,
	colorMap: {
		heightmap: [],
		temperature: [],
		moisture: [],
	},
	neighbors: {
		Ocean: 10,
		DeepOcean: 40,
	},
	noise() {
		return {
			heightmap: () => 0,
			temperature: () => 0,
			moisture: () => 0,
		};
	},
};
