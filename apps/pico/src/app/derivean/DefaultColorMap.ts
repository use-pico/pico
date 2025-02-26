import { HSLA } from "~/app/derivean/type/Color";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";

export const DefaultColorMap: NoiseColorMap = [
	// Deep water
	{
		level: [-1.0, -0.7],
		color: HSLA([210, 80, 20, 1.0]),
	},
	// Medium depth water
	{
		level: [-0.7, -0.5],
		color: HSLA([210, 75, 30, 1.0]),
	},
	// Shallow water
	{
		level: [-0.5, -0.3],
		color: HSLA([200, 70, 40, 1.0]),
	},
	// Very shallow water
	{
		level: [-0.3, -0.1],
		color: HSLA([190, 65, 45, 1.0]),
	},
	// Beach/Shore
	{
		level: [-0.1, 0.0],
		color: HSLA([40, 60, 75, 1.0]),
	},
	// Low elevation land (soil)
	{
		level: [0.0, 0.2],
		color: HSLA([35, 50, 40, 1.0]),
	},
	// Medium-low elevation (soil)
	{
		level: [0.2, 0.4],
		color: HSLA([30, 45, 35, 1.0]),
	},
	// Medium elevation (soil)
	{
		level: [0.4, 0.6],
		color: HSLA([25, 40, 30, 1.0]),
	},
	// Medium-high elevation (rocky soil)
	{
		level: [0.6, 0.8],
		color: HSLA([20, 35, 25, 1.0]),
	},
	// High elevation (rocky terrain)
	{
		level: [0.8, 0.9],
		color: HSLA([15, 30, 20, 1.0]),
	},
	// Mountain peaks
	{
		level: [0.9, 1.0],
		color: HSLA([0, 0, 90, 1.0]),
	},
] as NoiseColorMap;
