import type { Biome } from "~/app/derivean/type/Biome";

export const MoistureBiome: Biome = {
	type: "moisture",
	resolve({ base, color, source }) {
		return undefined;
	},
};
