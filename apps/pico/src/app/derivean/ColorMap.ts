import type { NoiseColor } from "~/app/derivean/type/NoiseColor";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";

/**
 * Original biome stops, with detailed HSLA values.
 * These values are used only to extract the base hue.
 */
const source: NoiseColor[] = [
	// Deep Water
	{ noise: -1.0, color: [210, 70, 15, 1] },
	{ noise: -0.98, color: [210, 70, 17, 1] },
	{ noise: -0.96, color: [210, 70, 19, 0.98] },
	{ noise: -0.94, color: [210, 65, 21, 0.96] },
	{ noise: -0.92, color: [210, 60, 23, 0.94] },
	{ noise: -0.9, color: [210, 55, 25, 0.92] },
	{ noise: -0.85, color: [210, 50, 27, 0.9] },
	{ noise: -0.8, color: [210, 50, 29, 0.88] },
	{ noise: -0.75, color: [210, 45, 31, 0.86] },
	{ noise: -0.7, color: [210, 45, 33, 0.84] },
	{ noise: -0.65, color: [210, 40, 35, 0.82] },
	{ noise: -0.6, color: [210, 40, 37, 0.8] },
	{ noise: -0.55, color: [210, 40, 39, 0.78] },
	{ noise: -0.5, color: [210, 40, 41, 0.75] },

	// Foam
	{ noise: -0.48, color: [195, 40, 90, 0.72] },
	{ noise: -0.47, color: [195, 40, 92, 0.7] },
	{ noise: -0.46, color: [195, 40, 94, 0.68] },
	{ noise: -0.455, color: [195, 40, 96, 0.66] },
	{ noise: -0.45, color: [195, 40, 98, 0.64] },

	// Transitional Shade (Turquoise → Beach)
	{ noise: -0.445, color: [170, 35, 85, 0.8] },

	// Beaches
	{ noise: -0.44, color: [45, 85, 70, 0.9] },
	{ noise: -0.4, color: [45, 85, 68, 0.9] },
	{ noise: -0.35, color: [45, 85, 66, 0.9] },
	{ noise: -0.3, color: [45, 85, 64, 0.9] },
	{ noise: -0.25, color: [45, 85, 62, 0.9] },
	{ noise: -0.2, color: [45, 85, 60, 0.9] },

	// Grasslands
	{ noise: -0.15, color: [120, 55, 46, 0.85] },
	{ noise: -0.1, color: [120, 55, 43, 0.85] },
	{ noise: -0.05, color: [120, 55, 40, 0.85] },
	{ noise: -0.01, color: [120, 55, 37, 0.85] },
	{ noise: 0.01, color: [120, 55, 35, 0.85] },
	{ noise: 0.03, color: [120, 55, 33, 0.85] },

	// Forest Edge
	{ noise: 0.05, color: [120, 50, 31, 0.9] },
	{ noise: 0.07, color: [120, 50, 29, 0.9] },

	// Forests
	{ noise: 0.09, color: [120, 60, 27, 0.9] },
	{ noise: 0.15, color: [120, 60, 25, 0.9] },
	{ noise: 0.2, color: [120, 60, 23, 0.9] },
	{ noise: 0.25, color: [120, 60, 21, 0.9] },
	{ noise: 0.3, color: [120, 60, 19, 0.9] },

	// Hills
	{ noise: 0.35, color: [120, 50, 17, 0.9] },
	{ noise: 0.4, color: [120, 50, 19, 0.9] },
	{ noise: 0.45, color: [120, 50, 21, 0.9] },
	{ noise: 0.5, color: [120, 50, 23, 0.9] },
	{ noise: 0.55, color: [120, 50, 25, 0.9] },
	{ noise: 0.6, color: [120, 50, 27, 0.9] },

	// Mountains – top remains white
	{ noise: 0.8, color: [210, 10, 65, 1] },
	{ noise: 0.85, color: [210, 5, 80, 1] },
	{ noise: 0.88, color: [210, 3, 88, 1] },
	{ noise: 0.92, color: [210, 2, 92, 1] },
	{ noise: 0.95, color: [210, 1, 96, 1] },
	{ noise: 0.97, color: [210, 1, 98, 1] },
	{ noise: 1.0, color: [0, 0, 100, 1] },
];

/**
 * Updated ColorMap using the decoupled approach:
 * - Biome colors now only supply the base hue.
 * - For each biome stop (except the top white stop), we force saturation and lightness to default values.
 * - Later, heightmap, temperature, and moisture will adjust the final saturation and lightness.
 */
export const ColorMap: NoiseColorMap = {
	heightmap: ((): NoiseColor[] => {
		const stops: NoiseColor[] = [];
		const numStops = 101;
		for (let i = 0; i < numStops; i++) {
			// noise goes from -3 to +3:
			const noise = -3 + (6 * i) / (numStops - 1);
			// Map noise linearly to lightness values from -75 to 75:
			const lightness = -75 + (150 * i) / (numStops - 1);
			// Apply a modest saturation for above-water values (noise >= 0), underwater remains unsaturated.
			// For example, at noise 3, saturation becomes 15.
			const saturation = noise < 0 ? 0 : (noise / 3) * 15;
			stops.push({ noise, color: [0, saturation, lightness, 1] });
		}
		return stops;
	})(),

	biome: source
		.map(({ noise, color }) => {
			if (noise === 1.0) {
				return { noise, color: [0, 0, 100, 1] as const };
			}

			return { noise, color: [color[0], 100, 50, 1] as const };
		})
		.sort((a, b) => b.noise - a.noise) as NoiseColor[],

	temperature: [],
	moisture: [],
	shade: [],
} as const;
