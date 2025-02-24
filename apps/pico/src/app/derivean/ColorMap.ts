import type { GameConfig } from "~/app/derivean/GameConfig";

/**
 * A gentler HSLA color map that maintains the same noise stops,
 * but uses smoother transitions to avoid harsh color changes.
 */
export const ColorMap: GameConfig.ColorMap = {
	heightmap: [
		// Deep Water (lower saturations, gradual lightness increase)
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

		// Foam (lower saturation, narrower alpha changes)
		{ noise: -0.48, color: [195, 40, 90, 0.7] },
		{ noise: -0.47, color: [195, 40, 91, 0.68] },
		{ noise: -0.46, color: [195, 40, 92, 0.66] },
		{ noise: -0.455, color: [195, 40, 93, 0.64] },
		{ noise: -0.45, color: [195, 40, 94, 0.62] },

		// Transitional Shade (Turquoise → Beach)
		{ noise: -0.445, color: [170, 30, 75, 0.8] },

		// Beaches (lower saturation around 70, gentle shifts in lightness)
		{ noise: -0.44, color: [45, 70, 70, 0.9] },
		{ noise: -0.4, color: [45, 70, 68, 0.9] },
		{ noise: -0.35, color: [45, 70, 66, 0.9] },
		{ noise: -0.3, color: [45, 70, 64, 0.9] },
		{ noise: -0.25, color: [45, 70, 62, 0.9] },
		{ noise: -0.2, color: [45, 70, 60, 0.9] },
		{ noise: -0.15, color: [45, 70, 58, 0.9] },
		{ noise: -0.1, color: [45, 70, 56, 0.9] },
		{ noise: -0.05, color: [45, 70, 54, 0.9] },
		{ noise: -0.03, color: [45, 65, 52, 0.9] },
		{ noise: -0.01, color: [45, 60, 50, 0.9] },
		{ noise: 0.01, color: [45, 55, 48, 0.9] },
		{ noise: 0.03, color: [45, 50, 46, 0.9] },

		// Grasslands
		{ noise: 0.05, color: [120, 40, 45, 0.85] },
		{ noise: 0.1, color: [120, 40, 42, 0.85] },
		{ noise: 0.15, color: [120, 40, 39, 0.85] },
		{ noise: 0.2, color: [120, 40, 36, 0.85] },
		{ noise: 0.25, color: [120, 40, 33, 0.85] },
		{ noise: 0.3, color: [120, 40, 30, 0.85] },

		// Forest Edge Contrast
		{ noise: 0.32, color: [120, 40, 28, 0.9] },
		{ noise: 0.33, color: [120, 40, 28, 0.9] },

		// Forests (moderate saturation, stepping down lightness)
		{ noise: 0.35, color: [120, 50, 26, 0.9] },
		{ noise: 0.4, color: [120, 50, 24, 0.9] },
		{ noise: 0.45, color: [120, 50, 22, 0.9] },
		{ noise: 0.5, color: [120, 50, 20, 0.9] },
		{ noise: 0.55, color: [120, 50, 18, 0.9] },
		{ noise: 0.6, color: [120, 50, 16, 0.9] },
		{ noise: 0.65, color: [120, 50, 14, 0.9] },

		// Hills
		{ noise: 0.68, color: [120, 45, 20, 0.9] },
		{ noise: 0.7, color: [100, 45, 25, 0.9] },
		{ noise: 0.75, color: [100, 40, 30, 0.9] },
		{ noise: 0.8, color: [100, 35, 35, 0.9] },
		{ noise: 0.85, color: [95, 30, 40, 0.9] },
		{ noise: 0.9, color: [95, 25, 45, 0.9] },
		{ noise: 0.92, color: [90, 20, 50, 0.9] },

		// Mountains (lower saturation, lightness stepping up to white)
		{ noise: 0.94, color: [210, 10, 35, 1] },
		{ noise: 0.95, color: [210, 10, 35, 1] },
		{ noise: 0.96, color: [210, 8, 40, 1] },
		{ noise: 0.97, color: [210, 6, 50, 1] },
		{ noise: 0.98, color: [210, 5, 60, 1] },
		{ noise: 0.985, color: [210, 4, 70, 1] },
		{ noise: 0.99, color: [210, 3, 80, 1] },
		{ noise: 0.995, color: [210, 2, 90, 1] },
		{ noise: 1.0, color: [0, 0, 100, 1] },
	].sort((a, b) => b.noise - a.noise) as GameConfig.NoiseColor[],

	// Biome stops – same as before, or reduce them similarly if needed.
	biome: [
		{ noise: -1.0, color: [0, 0, 0, 0] },
		{ noise: -0.5, color: [-5, 0, 0, 0] },
		{ noise: 0.0, color: [0, 0, 0, 0] },
		{ noise: 0.5, color: [5, 0, 0, 0] },
		{ noise: 1.0, color: [10, 0, 0, 0] },
	].sort((a, b) => b.noise - a.noise) as GameConfig.NoiseColor[],

	// Temperature stops
	temperature: [
		{ noise: -1.0, color: [0, 0, -10, 0] },
		{ noise: -0.5, color: [0, 0, -5, 0] },
		{ noise: 0.0, color: [0, 0, 0, 0] },
		{ noise: 0.5, color: [0, 0, 5, 0] },
		{ noise: 1.0, color: [0, 0, 10, 0] },
	].sort((a, b) => b.noise - a.noise) as GameConfig.NoiseColor[],

	// Moisture stops
	moisture: [
		{ noise: -1.0, color: [0, -10, 0, 0] },
		{ noise: -0.5, color: [0, -5, 0, 0] },
		{ noise: 0.0, color: [0, 0, 0, 0] },
		{ noise: 0.5, color: [0, 5, 0, 0] },
		{ noise: 1.0, color: [0, 10, 0, 0] },
	].sort((a, b) => b.noise - a.noise) as GameConfig.NoiseColor[],
} as const;
