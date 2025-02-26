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
		color: HSLA([230, 95, 12, 1.0]),
	},
	// Very deep ocean
	{
		level: [-0.85, -0.7],
		color: HSLA([225, 90, 16, 1.0]),
	},
	// Deep ocean
	{
		level: [-0.7, -0.55],
		color: HSLA([220, 85, 20, 1.0]),
	},
	// Medium-deep water
	{
		level: [-0.55, -0.4],
		color: HSLA([215, 80, 26, 1.0]),
	},
	// Medium water
	{
		level: [-0.4, -0.3],
		color: HSLA([210, 75, 32, 1.0]),
	},
	// Shallow water
	{
		level: [-0.3, -0.2],
		color: HSLA([200, 70, 40, 1.0]),
	},
	// Very shallow water
	{
		level: [-0.2, -0.1],
		color: HSLA([190, 65, 48, 1.0]),
	},
	// Coastal water
	{
		level: [-0.1, -0.05],
		color: HSLA([180, 60, 55, 1.0]),
	},
	// Beach/Shore
	{
		level: [-0.05, 0.0],
		color: HSLA([45, 70, 72, 1.0]),
	},
	// Low elevation land
	{
		level: [0.0, 0.15],
		color: HSLA([35, 50, 45, 1.0]),
	},
	// Medium elevation land
	{
		level: [0.15, 0.3],
		color: HSLA([30, 45, 38, 1.0]),
	},
	// Medium-high plains
	{
		level: [0.3, 0.45],
		color: HSLA([25, 40, 32, 1.0]),
	},
	// Hills
	{
		level: [0.45, 0.6],
		color: HSLA([20, 35, 28, 1.0]),
	},
	// Highland
	{
		level: [0.6, 0.75],
		color: HSLA([15, 30, 25, 1.0]),
	},
	// Mountain bases
	{
		level: [0.75, 0.85],
		color: HSLA([10, 25, 22, 1.0]),
	},
	// Mountain slopes
	{
		level: [0.85, 0.95],
		color: HSLA([5, 20, 40, 1.0]),
	},
	// Mountain peaks
	{
		level: [0.95, 1.0],
		color: HSLA([0, 5, 85, 1.0]),
	},
] as NoiseColorMap;
