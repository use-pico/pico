import { HSLA } from "~/app/derivean/type/Color";
import type { TerrainLayer } from "~/app/derivean/type/TerrainLayer";

/**
 * Predefined terrain layers for common terrain types
 */
export const DefaultTerrainLayers = {
	DeepOcean: {
		name: "deep-ocean",
		color: HSLA([220, 80, 20, 1.0]),
		level: -1.0,
		length: 0.15,
		steps: 5,
	} satisfies TerrainLayer,
	Ocean: {
		name: "ocean",
		color: HSLA([210, 70, 30, 1.0]),
		level: -0.85,
		length: 0.2,
		steps: 5,
	} satisfies TerrainLayer,
	ShallowWater: {
		name: "shallow-water",
		color: HSLA([190, 50, 40, 1.0]),
		level: -0.65,
		length: 0.2,
		steps: 5,
	} satisfies TerrainLayer,
	Beach: {
		name: "beach",
		color: HSLA([40, 60, 65, 1.0]),
		level: -0.45,
		length: 0.2,
		steps: 5,
	} satisfies TerrainLayer,
	Lowland: {
		name: "lowland",
		color: HSLA([30, 50, 45, 1.0]),
		level: -0.25,
		length: 0.25,
		steps: 5,
	} satisfies TerrainLayer,
	Midland: {
		name: "midland",
		color: HSLA([20, 40, 35, 1.0]),
		level: 0.0,
		length: 0.45,
		steps: 10,
	} satisfies TerrainLayer,
	Highland: {
		name: "highland",
		color: HSLA([10, 30, 25, 1.0]),
		level: 0.45,
		length: 0.4,
		steps: 25,
	} satisfies TerrainLayer,
	Mountain: {
		name: "mountain",
		color: HSLA([5, 15, 40, 1.0]),
		level: 0.85,
		length: 0.15,
		steps: 10,
	} satisfies TerrainLayer,
} as const;
