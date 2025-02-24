import type { GameConfig } from "~/app/derivean/GameConfig";

export const ColorMap: GameConfig.ColorMap = {
	heightmap: [
		// Deep Water (Added Variation)
		{ noise: -1.0, color: [240, 100, 16, 1] },
		{ noise: -0.98, color: [240, 100, 18, 1] },
		{ noise: -0.96, color: [240, 100, 20, 0.98] },
		{ noise: -0.94, color: [235, 91, 23, 0.96] },
		{ noise: -0.92, color: [230, 82, 26, 0.94] },
		{ noise: -0.9, color: [225, 74, 29, 0.92] },
		{ noise: -0.85, color: [220, 67, 32, 0.9] },
		{ noise: -0.8, color: [215, 61, 35, 0.88] },
		{ noise: -0.75, color: [210, 56, 38, 0.86] },
		{ noise: -0.7, color: [205, 53, 41, 0.84] },
		{ noise: -0.65, color: [180, 100, 27, 0.82] },
		{ noise: -0.6, color: [175, 100, 31, 0.8] },
		{ noise: -0.55, color: [170, 100, 35, 0.78] },
		{ noise: -0.5, color: [165, 100, 39, 0.75] },

		// Foam
		{ noise: -0.48, color: [195, 100, 95, 0.71] },
		{ noise: -0.47, color: [195, 100, 96, 0.69] },
		{ noise: -0.46, color: [195, 100, 97, 0.67] },
		{ noise: -0.455, color: [195, 100, 98, 0.65] },
		{ noise: -0.45, color: [195, 100, 99, 0.63] },

		// Transitional Shade (Turquoise → Beach)
		{ noise: -0.445, color: [120, 35, 81, 0.82] },

		// Beaches
		{ noise: -0.44, color: [43, 100, 85, 0.94] },
		{ noise: -0.4, color: [43, 100, 80, 0.94] },
		{ noise: -0.35, color: [43, 100, 75, 0.94] },
		{ noise: -0.3, color: [43, 100, 70, 0.94] },
		{ noise: -0.25, color: [43, 100, 65, 0.94] },
		{ noise: -0.2, color: [43, 100, 60, 0.94] },
		{ noise: -0.15, color: [43, 100, 55, 0.94] },
		{ noise: -0.1, color: [39, 100, 50, 0.94] },
		{ noise: -0.05, color: [39, 100, 50, 0.94] },
		{ noise: -0.03, color: [43, 83, 45, 0.94] },
		{ noise: -0.01, color: [43, 79, 40, 0.94] },
		{ noise: 0.01, color: [43, 66, 36, 0.94] },
		{ noise: 0.03, color: [35, 46, 33, 0.94] },

		// Grasslands
		{ noise: 0.05, color: [134, 49, 33, 0.9] },
		{ noise: 0.1, color: [134, 48, 32, 0.9] },
		{ noise: 0.15, color: [134, 47, 30, 0.9] },
		{ noise: 0.2, color: [134, 45, 28, 0.9] },
		{ noise: 0.25, color: [134, 46, 26, 0.9] },
		{ noise: 0.3, color: [134, 50, 24, 0.9] },

		// Forest Edge Contrast
		{ noise: 0.32, color: [147, 50, 20, 1] },
		{ noise: 0.33, color: [147, 50, 20, 1] },

		// Forests
		{ noise: 0.35, color: [147, 63, 32, 1] },
		{ noise: 0.4, color: [147, 64, 29, 1] },
		{ noise: 0.45, color: [147, 65, 27, 1] },
		{ noise: 0.5, color: [147, 67, 25, 1] },
		{ noise: 0.55, color: [147, 68, 22, 1] },
		{ noise: 0.6, color: [147, 69, 21, 1] },
		{ noise: 0.65, color: [147, 70, 19, 1] },

		// Hills
		{ noise: 0.68, color: [147, 50, 20, 1] },
		{ noise: 0.7, color: [93, 58, 35, 1] },
		{ noise: 0.75, color: [93, 52, 41, 1] },
		{ noise: 0.8, color: [93, 47, 45, 1] },
		{ noise: 0.85, color: [93, 42, 51, 1] },
		{ noise: 0.9, color: [93, 37, 55, 1] },
		{ noise: 0.92, color: [93, 32, 61, 1] },

		// Mountains
		{ noise: 0.94, color: [240, 9, 32, 1] },
		{ noise: 0.95, color: [240, 9, 32, 1] },
		{ noise: 0.96, color: [240, 6, 40, 1] },
		{ noise: 0.97, color: [240, 4, 50, 1] },
		{ noise: 0.98, color: [240, 4, 61, 1] },
		{ noise: 0.985, color: [240, 2, 69, 1] },
		{ noise: 0.99, color: [240, 2, 79, 1] },
		{ noise: 0.995, color: [240, 1, 90, 1] },
		{ noise: 1.0, color: [0, 0, 100, 1] },
	].sort((a, b) => b.noise - a.noise) as GameConfig.NoiseColor[],
	biome: [],
	temperature: [],
	moisture: [],
} as const;
