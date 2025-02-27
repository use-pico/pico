import type { Biome } from "~/app/derivean/type/Biome";

export const TemperatureBiome: Biome = {
	type: "Temperature",
	resolve({ type, color, source }) {
		return undefined;
	},
};
