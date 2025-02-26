import { HSLA } from "~/app/derivean/type/Color";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";

/**
 * Defines an extended color mapping for different noise values
 * Provides much finer granularity in terrain color representation
 */
export const DefaultColorMap: NoiseColorMap = [
	// Deepest Ocean (Abyssal Zone)
	{ level: [-1.0, -0.975], color: HSLA([235, 95, 10, 1.0]) },
	{ level: [-0.975, -0.95], color: HSLA([232, 92, 11, 1.0]) },
	{ level: [-0.95, -0.925], color: HSLA([230, 90, 12, 1.0]) },
	{ level: [-0.925, -0.9], color: HSLA([228, 88, 13, 1.0]) },
	{ level: [-0.9, -0.875], color: HSLA([226, 86, 14, 1.0]) },

	// Deep Ocean (Bathyal Zone)
	{ level: [-0.875, -0.85], color: HSLA([224, 84, 15, 1.0]) },
	{ level: [-0.85, -0.825], color: HSLA([222, 82, 16, 1.0]) },
	{ level: [-0.825, -0.8], color: HSLA([220, 80, 17, 1.0]) },
	{ level: [-0.8, -0.775], color: HSLA([218, 78, 18, 1.0]) },
	{ level: [-0.775, -0.75], color: HSLA([216, 76, 19, 1.0]) },

	// Deep to Medium Water (Hadal Zone)
	{ level: [-0.75, -0.725], color: HSLA([214, 74, 20, 1.0]) },
	{ level: [-0.725, -0.7], color: HSLA([212, 72, 22, 1.0]) },
	{ level: [-0.7, -0.675], color: HSLA([210, 70, 24, 1.0]) },
	{ level: [-0.675, -0.65], color: HSLA([208, 68, 26, 1.0]) },
	{ level: [-0.65, -0.625], color: HSLA([206, 66, 28, 1.0]) },

	// Medium Water (Upper Bathyal Zone)
	{ level: [-0.625, -0.6], color: HSLA([204, 64, 30, 1.0]) },
	{ level: [-0.6, -0.575], color: HSLA([202, 62, 32, 1.0]) },
	{ level: [-0.575, -0.55], color: HSLA([200, 60, 34, 1.0]) },
	{ level: [-0.55, -0.525], color: HSLA([198, 58, 36, 1.0]) },
	{ level: [-0.525, -0.5], color: HSLA([196, 56, 38, 1.0]) },

	// Shallow Water (Continental Shelf)
	{ level: [-0.5, -0.475], color: HSLA([194, 54, 40, 1.0]) },
	{ level: [-0.475, -0.45], color: HSLA([192, 52, 42, 1.0]) },
	{ level: [-0.45, -0.425], color: HSLA([190, 50, 44, 1.0]) },
	{ level: [-0.425, -0.4], color: HSLA([188, 48, 46, 1.0]) },
	{ level: [-0.4, -0.375], color: HSLA([186, 46, 48, 1.0]) },

	// Very Shallow Water (Coastal Transition)
	{ level: [-0.375, -0.35], color: HSLA([184, 44, 50, 1.0]) },
	{ level: [-0.35, -0.325], color: HSLA([182, 42, 52, 1.0]) },
	{ level: [-0.325, -0.3], color: HSLA([180, 40, 54, 1.0]) },
	{ level: [-0.3, -0.275], color: HSLA([178, 38, 56, 1.0]) },
	{ level: [-0.275, -0.25], color: HSLA([176, 36, 58, 1.0]) },

	// Coastal Waters
	{ level: [-0.25, -0.225], color: HSLA([174, 34, 60, 1.0]) },
	{ level: [-0.225, -0.2], color: HSLA([172, 32, 62, 1.0]) },
	{ level: [-0.2, -0.175], color: HSLA([170, 30, 64, 1.0]) },
	{ level: [-0.175, -0.15], color: HSLA([168, 28, 66, 1.0]) },
	{ level: [-0.15, -0.125], color: HSLA([166, 26, 68, 1.0]) },

	// Shoreline and Coastal Transition
	{ level: [-0.125, -0.1], color: HSLA([164, 45, 70, 1.0]) },
	{ level: [-0.1, -0.075], color: HSLA([52, 65, 72, 1.0]) },
	{ level: [-0.075, -0.05], color: HSLA([48, 60, 70, 1.0]) },
	{ level: [-0.05, -0.025], color: HSLA([45, 55, 68, 1.0]) },
	{ level: [-0.025, 0.0], color: HSLA([42, 50, 66, 1.0]) },

	// Beach and Coastal Lowland
	{ level: [0.0, 0.025], color: HSLA([40, 55, 52, 1.0]) },
	{ level: [0.025, 0.05], color: HSLA([38, 52, 50, 1.0]) },
	{ level: [0.05, 0.075], color: HSLA([36, 50, 48, 1.0]) },
	{ level: [0.075, 0.1], color: HSLA([34, 48, 46, 1.0]) },
	{ level: [0.1, 0.125], color: HSLA([32, 46, 44, 1.0]) },

	// Lowland and Coastal Plains
	{ level: [0.125, 0.15], color: HSLA([30, 44, 42, 1.0]) },
	{ level: [0.15, 0.175], color: HSLA([28, 42, 40, 1.0]) },
	{ level: [0.175, 0.2], color: HSLA([26, 40, 38, 1.0]) },
	{ level: [0.2, 0.225], color: HSLA([24, 38, 36, 1.0]) },
	{ level: [0.225, 0.25], color: HSLA([22, 36, 34, 1.0]) },

	// Low Elevation Land
	{ level: [0.25, 0.275], color: HSLA([20, 34, 32, 1.0]) },
	{ level: [0.275, 0.3], color: HSLA([18, 32, 30, 1.0]) },
	{ level: [0.3, 0.325], color: HSLA([16, 30, 28, 1.0]) },
	{ level: [0.325, 0.35], color: HSLA([14, 28, 26, 1.0]) },
	{ level: [0.35, 0.375], color: HSLA([12, 26, 24, 1.0]) },

	// Mid Elevation Land
	{ level: [0.375, 0.4], color: HSLA([10, 24, 22, 1.0]) },
	{ level: [0.4, 0.425], color: HSLA([8, 22, 24, 1.0]) },
	{ level: [0.425, 0.45], color: HSLA([6, 20, 26, 1.0]) },
	{ level: [0.45, 0.475], color: HSLA([4, 18, 28, 1.0]) },
	{ level: [0.475, 0.5], color: HSLA([2, 16, 30, 1.0]) },

	// Elevated Terrain
	{ level: [0.5, 0.525], color: HSLA([0, 14, 32, 1.0]) },
	{ level: [0.525, 0.55], color: HSLA([358, 12, 34, 1.0]) },
	{ level: [0.55, 0.575], color: HSLA([356, 10, 36, 1.0]) },
	{ level: [0.575, 0.6], color: HSLA([354, 8, 38, 1.0]) },
	{ level: [0.6, 0.625], color: HSLA([352, 6, 40, 1.0]) },

	// High Plains
	{ level: [0.625, 0.65], color: HSLA([350, 14, 42, 1.0]) },
	{ level: [0.65, 0.675], color: HSLA([348, 12, 44, 1.0]) },
	{ level: [0.675, 0.7], color: HSLA([346, 10, 46, 1.0]) },
	{ level: [0.7, 0.725], color: HSLA([344, 8, 48, 1.0]) },
	{ level: [0.725, 0.75], color: HSLA([342, 6, 50, 1.0]) },

	// Foothills
	{ level: [0.75, 0.775], color: HSLA([20, 25, 52, 1.0]) },
	{ level: [0.775, 0.8], color: HSLA([18, 23, 54, 1.0]) },
	{ level: [0.8, 0.825], color: HSLA([16, 21, 56, 1.0]) },
	{ level: [0.825, 0.85], color: HSLA([14, 19, 58, 1.0]) },
	{ level: [0.85, 0.875], color: HSLA([12, 17, 60, 1.0]) },

	// Low Mountains
	{ level: [0.875, 0.9], color: HSLA([10, 15, 62, 1.0]) },
	{ level: [0.9, 0.925], color: HSLA([8, 13, 64, 1.0]) },
	{ level: [0.925, 0.95], color: HSLA([6, 11, 66, 1.0]) },
	{ level: [0.95, 0.975], color: HSLA([4, 9, 70, 1.0]) },
	{ level: [0.975, 1.0], color: HSLA([2, 5, 85, 1.0]) },
];
