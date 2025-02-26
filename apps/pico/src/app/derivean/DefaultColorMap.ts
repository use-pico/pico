import { HSLA } from "~/app/derivean/type/Color";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";

/**
 * Defines the color mapping for different noise values
 * Currently focused on heightmap representation with smooth transitions
 */
export const DefaultColorMap: NoiseColorMap = [
	// Deepest ocean
	{
		level: [-1.0, -0.92],
		color: HSLA([230, 95, 10, 1.0]),
	},
	// Very deep ocean
	{
		level: [-0.92, -0.84],
		color: HSLA([225, 90, 14, 1.0]),
	},
	// Deep ocean
	{
		level: [-0.84, -0.76],
		color: HSLA([220, 85, 18, 1.0]),
	},
	// Deep water
	{
		level: [-0.76, -0.68],
		color: HSLA([215, 80, 22, 1.0]),
	},
	// Medium-deep water
	{
		level: [-0.68, -0.6],
		color: HSLA([212, 78, 26, 1.0]),
	},
	// Medium water
	{
		level: [-0.6, -0.5],
		color: HSLA([210, 75, 30, 1.0]),
	},
	// Medium-shallow water
	{
		level: [-0.5, -0.4],
		color: HSLA([205, 72, 35, 1.0]),
	},
	// Shallow water
	{
		level: [-0.4, -0.3],
		color: HSLA([200, 70, 40, 1.0]),
	},
	// Shallow water transition
	{
		level: [-0.3, -0.22],
		color: HSLA([195, 67, 45, 1.0]),
	},
	// Very shallow water
	{
		level: [-0.22, -0.15],
		color: HSLA([190, 65, 48, 1.0]),
	},
	// Coastal shallow water
	{
		level: [-0.15, -0.1],
		color: HSLA([185, 63, 52, 1.0]),
	},
	// Water's edge
	{
		level: [-0.1, -0.07],
		color: HSLA([180, 60, 55, 1.0]),
	},
	// Wet shoreline
	{
		level: [-0.07, -0.04],
		color: HSLA([60, 65, 62, 1.0]),
	},
	// Beach/Shore
	{
		level: [-0.04, -0.01],
		color: HSLA([45, 70, 72, 1.0]),
	},
	// Dry beach
	{
		level: [-0.01, 0.02],
		color: HSLA([40, 65, 70, 1.0]),
	},
	// Beach transition
	{
		level: [0.02, 0.05],
		color: HSLA([38, 60, 60, 1.0]),
	},
	// Coastal soil
	{
		level: [0.05, 0.09],
		color: HSLA([36, 55, 50, 1.0]),
	},
	// Low elevation land (soil)
	{
		level: [0.09, 0.14],
		color: HSLA([34, 50, 45, 1.0]),
	},
	// Low-medium elevation (soil)
	{
		level: [0.14, 0.19],
		color: HSLA([33, 48, 42, 1.0]),
	},
	// Lowland plains
	{
		level: [0.19, 0.24],
		color: HSLA([32, 46, 38, 1.0]),
	},
	// Medium-low elevation (soil)
	{
		level: [0.24, 0.29],
		color: HSLA([31, 45, 36, 1.0]),
	},
	// Lower plains (soil)
	{
		level: [0.29, 0.34],
		color: HSLA([30, 44, 34, 1.0]),
	},
	// Mid plains (soil)
	{
		level: [0.34, 0.39],
		color: HSLA([29, 43, 33, 1.0]),
	},
	// Upper plains (soil)
	{
		level: [0.39, 0.44],
		color: HSLA([28, 42, 32, 1.0]),
	},
	// Low hills (soil)
	{
		level: [0.44, 0.49],
		color: HSLA([27, 40, 31, 1.0]),
	},
	// Medium-high elevation (soil)
	{
		level: [0.49, 0.54],
		color: HSLA([26, 38, 30, 1.0]),
	},
	// High hills (transition to rocky)
	{
		level: [0.54, 0.59],
		color: HSLA([24, 36, 29, 1.0]),
	},
	// High-medium elevation (soil/rocky)
	{
		level: [0.59, 0.64],
		color: HSLA([22, 34, 28, 1.0]),
	},
	// Rocky hills
	{
		level: [0.64, 0.69],
		color: HSLA([20, 32, 27, 1.0]),
	},
	// Low highland (rocky soil)
	{
		level: [0.69, 0.74],
		color: HSLA([18, 30, 26, 1.0]),
	},
	// Highland (rocky terrain)
	{
		level: [0.74, 0.78],
		color: HSLA([16, 28, 25, 1.0]),
	},
	// High highland (rocky terrain)
	{
		level: [0.78, 0.82],
		color: HSLA([14, 26, 24, 1.0]),
	},
	// Mountain foothills
	{
		level: [0.82, 0.85],
		color: HSLA([12, 24, 23, 1.0]),
	},
	// Mountain base
	{
		level: [0.85, 0.88],
		color: HSLA([10, 22, 22, 1.0]),
	},
	// Lower mountain
	{
		level: [0.88, 0.91],
		color: HSLA([8, 20, 25, 1.0]),
	},
	// Mountain mid
	{
		level: [0.91, 0.94],
		color: HSLA([6, 18, 35, 1.0]),
	},
	// Upper mountain
	{
		level: [0.94, 0.96],
		color: HSLA([4, 15, 55, 1.0]),
	},
	// Mountain peaks
	{
		level: [0.96, 0.98],
		color: HSLA([2, 10, 75, 1.0]),
	},
	// Snow-capped peaks
	{
		level: [0.98, 1.0],
		color: HSLA([0, 0, 98, 1.0]),
	},
] as NoiseColorMap;
