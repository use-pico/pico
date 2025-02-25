/**
 * Defines required noise sources for a single biome.
 *
 * Idea is to have various noise generators providing various values to generate biome color.
 *
 * - Heightmap: Defines the height of the terrain. This defines shade of target color (only L)
 * - Biome: Defines color itself (only H), should not hold any other information (S,L)
 * - Temperature: Defines the temperature of the biome. This defines color shift (H)
 * - Moisture: Defines the moisture of the biome. This defines saturation shift (S)
 * - Shade: When provided, it may alter everything (H,S,L)
 */
export type NoiseType =
	| "biome"
	| "heightmap"
	| "temperature"
	| "moisture"
	| "shade";
