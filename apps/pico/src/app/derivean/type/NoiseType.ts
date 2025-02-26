/**
 * Defines required noise sources for a single biome.
 *
 * Idea is to have various noise generators providing various values to generate biome color.
 *
 * - Biome: Used to determine base biome color
 * - Heightmap: Use to determine biome color based on height
 * - Temperature: Modifies biome color based on temperature
 * - Moisture: Modifies biome color based on moisture
 * - Shade: Optional, just for some shade variation so the same biome doesn't look the same
 */
export type NoiseType =
	| "biome"
	| "heightmap"
	| "temperature"
	| "moisture"
	| "shade";
