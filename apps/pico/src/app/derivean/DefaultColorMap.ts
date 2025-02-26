import { HSLA } from "~/app/derivean/type/Color";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";

/**
 * Defines the color mapping for different noise values
 * Currently focused on heightmap representation with smooth transitions
 */
export const DefaultColorMap: NoiseColorMap = [
	// Deepest ocean
	{
		level: [-1.0, -0.85],
		color: HSLA([220, 85, 15, 1.0]),
	},
	// Deep ocean
	{
		level: [-0.85, -0.7],
		color: HSLA([215, 80, 20, 1.0]),
	},
	// Deep water
	{
		level: [-0.7, -0.6],
		color: HSLA([212, 75, 25, 1.0]),
	},
	// Medium-deep water
	{
		level: [-0.6, -0.5],
		color: HSLA([210, 72, 30, 1.0]),
	},
	// Medium water
	{
		level: [-0.5, -0.4],
		color: HSLA([205, 70, 35, 1.0]),
	},
	// Medium-shallow water
	{
		level: [-0.4, -0.3],
		color: HSLA([200, 68, 40, 1.0]),
	},
	// Shallow water
	{
		level: [-0.3, -0.2],
		color: HSLA([195, 65, 45, 1.0]),
	},
	// Very shallow water
	{
		level: [-0.2, -0.1],
		color: HSLA([190, 60, 50, 1.0]),
	},
	// Coastal water
	{
		level: [-0.1, -0.05],
		color: HSLA([180, 55, 55, 1.0]),
	},
	// Beach/Shore
	{
		level: [-0.05, 0.0],
		color: HSLA([40, 60, 75, 1.0]),
	},
	// Beach transition
	{
		level: [0.0, 0.05],
		color: HSLA([38, 55, 60, 1.0]),
	},
	// Low elevation land (soil)
	{
		level: [0.05, 0.15],
		color: HSLA([35, 50, 45, 1.0]),
	},
	// Low-medium elevation (soil)
	{
		level: [0.15, 0.25],
		color: HSLA([33, 48, 40, 1.0]),
	},
	// Medium-low elevation (soil)
	{
		level: [0.25, 0.35],
		color: HSLA([30, 45, 38, 1.0]),
	},
	// Medium elevation (soil)
	{
		level: [0.35, 0.45],
		color: HSLA([28, 43, 35, 1.0]),
	},
	// Medium-high elevation (soil)
	{
		level: [0.45, 0.55],
		color: HSLA([25, 40, 33, 1.0]),
	},
	// High-medium elevation (soil/rocky)
	{
		level: [0.55, 0.65],
		color: HSLA([22, 38, 30, 1.0]),
	},
	// Low highland (rocky soil)
	{
		level: [0.65, 0.75],
		color: HSLA([20, 35, 28, 1.0]),
	},
	// Highland (rocky terrain)
	{
		level: [0.75, 0.82],
		color: HSLA([18, 33, 25, 1.0]),
	},
	// Mountain base
	{
		level: [0.82, 0.88],
		color: HSLA([15, 30, 22, 1.0]),
	},
	// Mountain mid
	{
		level: [0.88, 0.94],
		color: HSLA([10, 25, 35, 1.0]),
	},
	// Mountain peaks
	{
		level: [0.94, 0.98],
		color: HSLA([5, 20, 70, 1.0]),
	},
	// Snow-capped peaks
	{
		level: [0.98, 1.0],
		color: HSLA([0, 0, 90, 1.0]),
	},
] as NoiseColorMap;
