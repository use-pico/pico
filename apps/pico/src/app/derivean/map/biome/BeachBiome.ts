import type { Biome } from "~/app/derivean/type/Biome";

export const BeachBiome: Biome = {
	name: "Beach",
	colorMap: {
		heightmap: Array.from({ length: 60 }, (_, i) => {
			const noise = -1 + (i * 2) / 59;
			const t = (noise + 1) / 2;
			// For heightmap, create a gradient representing a transition from rocky or wet sand to bright, dry sand.
			// Example: hue from 45 (darker sand) to 40 (light, sunlit sand)
			const hue = 45 + (40 - 45) * t;
			// Saturation gradually drops from 35% to 30%
			const saturation = 35 + (30 - 35) * t;
			// Lightness increases from 25% (darker) to 80% (bright)
			const lightness = 25 + (80 - 25) * t;
			return { noise, color: [hue, saturation, lightness, 1] };
		}),
		temperature: Array.from({ length: 30 }, (_, i) => {
			const noise = -1 + (i * 2) / 29;
			const t = (noise + 1) / 2;
			// For temperature, we blend from a cooler tint (blue-ish) to a warmer tint (yellow-ish)
			// Adjust these values as desired.
			const hue = 200 + (50 - 200) * t;
			const saturation = 20 + (40 - 20) * t;
			const lightness = 50 + (60 - 50) * t;
			return { noise, color: [hue, saturation, lightness, 0.3] };
		}),
		moisture: Array.from({ length: 20 }, (_, i) => {
			const noise = -1 + (i * 2) / 19;
			const t = (noise + 1) / 2;
			// For moisture, blend from drier conditions (low saturation, more beige) to wetter (more vibrant)
			const hue = 30 + (20 - 30) * t;
			const saturation = 15 + (35 - 15) * t;
			const lightness = 70 + (80 - 70) * t;
			return { noise, color: [hue, saturation, lightness, 0.3] };
		}),
	},
	noise() {
		return {
			heightmap: () => 0,
			temperature: () => 0,
			moisture: () => 0,
		};
	},
};
