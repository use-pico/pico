import { HSLA } from "~/app/derivean/type/Color";
import type { TerrainLayer } from "~/app/derivean/type/TerrainLayer";

/**
 * Predefined terrain layers for common terrain types
 * Organized by elevation from water to mountains
 * All lengths are multiples of 0.05 for easier management
 */
export const DefaultTerrainLayers = {
	// Water bodies
	DeepOcean: {
		name: "deep-ocean",
		color: HSLA([220, 85, 18, 1.0]),
		length: 0.15,
		steps: 5,
		transition: 6,
	} satisfies TerrainLayer,

	Ocean: {
		name: "ocean",
		color: HSLA([215, 75, 25, 1.0]),
		length: 0.15,
		steps: 5,
		transition: 4,
	} satisfies TerrainLayer,

	ShallowWater: {
		name: "shallow-water",
		color: HSLA([195, 65, 35, 1.0]),
		length: 0.125,
		steps: 6,
		transition: 6,
	} satisfies TerrainLayer,

	// Foam layer for water-to-land transition
	Foam: {
		name: "foam",
		color: HSLA([190, 25, 85, 1.0]),
		length: 0.025,
		steps: 5,
		transition: 6,
	} satisfies TerrainLayer,

	// Transition zone
	Coast: {
		name: "coast",
		color: HSLA([180, 40, 45, 1.0]),
		length: 0.05,
		steps: 6,
		transition: 8,
	} satisfies TerrainLayer,

	Beach: {
		name: "beach",
		color: HSLA([45, 65, 70, 1.0]),
		length: 0.05,
		steps: 6,
		transition: 5,
	} satisfies TerrainLayer,

	// Low elevation areas
	Wetland: {
		name: "wetland",
		color: HSLA([85, 45, 40, 1.0]),
		length: 0.1,
		steps: 6,
		transition: 5,
	} satisfies TerrainLayer,

	Lowland: {
		name: "lowland",
		color: HSLA([65, 55, 45, 1.0]),
		length: 0.15,
		steps: 8,
		transition: 4,
	} satisfies TerrainLayer,

	// Mid elevation areas
	Valley: {
		name: "valley",
		color: HSLA([35, 50, 40, 1.0]),
		length: 0.15,
		steps: 8,
		transition: 6,
	} satisfies TerrainLayer,

	Grassland: {
		name: "grassland",
		color: HSLA([90, 40, 35, 1.0]),
		length: 0.2,
		steps: 8,
		transition: 6,
	} satisfies TerrainLayer,

	Midland: {
		name: "midland",
		color: HSLA([25, 40, 32, 1.0]),
		length: 0.2,
		steps: 10,
		transition: 6,
	} satisfies TerrainLayer,

	// High elevation areas
	Highland: {
		name: "highland",
		color: HSLA([15, 35, 28, 1.0]),
		length: 0.2,
		steps: 10,
		transition: 4,
	} satisfies TerrainLayer,

	Foothills: {
		name: "foothills",
		color: HSLA([10, 30, 25, 1.0]),
		length: 0.15,
		steps: 10,
		transition: 6,
	} satisfies TerrainLayer,

	// Mountain areas
	Mountain: {
		name: "mountain",
		color: HSLA([5, 20, 35, 1.0]),
		length: 0.15,
		steps: 10,
		transition: 4,
	} satisfies TerrainLayer,

	HighMountain: {
		name: "high-mountain",
		color: HSLA([0, 10, 45, 1.0]),
		length: 0.1,
		steps: 8,
		transition: 5,
	} satisfies TerrainLayer,

	MountainPeak: {
		name: "mountain-peak",
		color: HSLA([0, 5, 85, 1.0]),
		length: 0.05,
		steps: 8,
	} satisfies TerrainLayer,
} as const;
