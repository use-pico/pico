import { withBiomeColors } from "~/app/derivean/service/generator/withBiomeColors";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";

/**
 * Final biome color lookup table in RGBA.
 * Each entry is defined in the RGBA color space (with R, G, B in [0, 255] and alpha in [0, 255])
 * along with threshold values for:
 *  - biome
 *  - heightmap
 *  - temperature
 *  - moisture
 *  - shade
 *
 * When all current noise values exceed an entry’s thresholds, that entry’s color is chosen.
 */
export const DefaultColorMap: NoiseColorMap = [
	/**
	 * Ocean
	 */
	...withBiomeColors({
		color: [0, 40, 190, 255],
		stops: 20,
		ranges: {
			biome: [-1, -0.75],
			heightmap: [-1, 1],
			moisture: [-1, 1],
			temperature: [-1, 1],
			shade: [-1, 1],
		},
		// factors: {
		// 	biome: 25,
		// 	heightmap: 10,
		// 	temperature: 50,
		// 	moisture: 50,
		// 	shade: 15,
		// },
	}),
	/**
	 * Beach
	 */
	// ...withBiomeColors({
	// 	color: [190, 190, 0, 255],
	// 	stops: 100,
	// 	ranges: {
	// 		biome: [-0.75, 0],
	// 		heightmap: [-1, 1],
	// 		moisture: [-1, 1],
	// 		temperature: [-1, 1],
	// 		shade: [-1, 1],
	// 	},
	// 	// factors: {
	// 	// 	biome: 25,
	// 	// 	heightmap: 10,
	// 	// 	temperature: 50,
	// 	// 	moisture: 50,
	// 	// 	shade: 15,
	// 	// },
	// }),
	/**
	 * Grassland
	 */
	...withBiomeColors({
		color: [34, 139, 34, 255],
		stops: 20,
		ranges: {
			biome: [0, 0.5],
			heightmap: [-1, 1],
			moisture: [-1, 1],
			temperature: [-1, 1],
			shade: [-1, 1],
		},
		// factors: {
		// 	biome: 10,
		// 	heightmap: 25,
		// 	temperature: 25,
		// 	moisture: 25,
		// 	shade: 15,
		// },
	}),
	/**
	 * Mountains
	 */
	...withBiomeColors({
		color: [90, 80, 80, 255],
		stops: 100,
		ranges: {
			biome: [0.5, 0.75],
			heightmap: [-1, 1],
			moisture: [-1, 1],
			temperature: [-1, 1],
			shade: [-1, 1],
		},
		// factors: {
		// 	biome: 10,
		// 	heightmap: 25,
		// 	temperature: 25,
		// 	moisture: 25,
		// 	shade: 25,
		// },
	}),
] as NoiseColorMap;
