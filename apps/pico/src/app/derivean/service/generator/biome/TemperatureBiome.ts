import { DefaultTerrainLayers } from "~/app/derivean/service/DefaultTerrainLayers";
import type { Biome } from "~/app/derivean/type/Biome";
import { HSLA } from "~/app/derivean/type/Color";

export const TemperatureBiome: Biome = {
	type: "Temperature",
	resolve({ color, source, base }) {
		// Get temperature in the -1 to 1 range
		const { temperature } = source;

		// Get the current HSLA values
		let [h, s, l] = color.color;

		// Calculate a temperature intensity factor
		const intensityFactor = Math.abs(temperature) ** 4;

		// Apply temperature effects based on terrain type from base.type
		switch (base.type) {
			// Water bodies
			case DefaultTerrainLayers.DeepOcean.name:
				if (temperature < 0) {
					// Cold deep water: subtle blue shift
					h += temperature * 5 * intensityFactor;
				} else {
					// Warm deep water: very subtle teal shift
					h += temperature * 3 * intensityFactor;
				}
				break;

			case DefaultTerrainLayers.Ocean.name:
			case DefaultTerrainLayers.ShallowWater.name:
				if (temperature < 0) {
					// Cold water: shift towards blue
					h += temperature * 10 * intensityFactor;
					s = Math.max(0, Math.min(100, s - temperature * 5 * intensityFactor));
				} else {
					// Warm water: shift towards teal/green
					h += temperature * 15 * intensityFactor;
					l = Math.max(0, Math.min(100, l + temperature * 3 * intensityFactor));
				}
				break;

			// Coastal areas
			case DefaultTerrainLayers.Beach.name:
			case DefaultTerrainLayers.Coast.name:
			case DefaultTerrainLayers.Foam.name:
				if (temperature < 0) {
					// Cold beaches: blueish tint
					h += temperature * 15 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 5 * intensityFactor));
				} else {
					// Warm beaches: more yellow
					h -= temperature * 10 * intensityFactor;
					s = Math.max(
						0,
						Math.min(100, s + temperature * 10 * intensityFactor),
					);
					l = Math.max(0, Math.min(100, l + temperature * 5 * intensityFactor));
				}
				break;

			// Mountain regions
			case DefaultTerrainLayers.Mountain.name:
			case DefaultTerrainLayers.HighMountain.name:
			case DefaultTerrainLayers.MountainPeak.name:
				if (temperature < 0) {
					// Cold mountains: blue/white shift (snow effect)
					h += temperature * 20 * intensityFactor;
					s = Math.max(
						0,
						Math.min(100, s + temperature * 15 * intensityFactor),
					);
					l = Math.max(
						0,
						Math.min(100, l - temperature * 10 * intensityFactor),
					);
				} else {
					// Warm mountains: subtle reddish effect
					h -= temperature * 5 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 5 * intensityFactor));
				}
				break;

			// Wetlands
			case DefaultTerrainLayers.Wetland.name:
				if (temperature < 0) {
					// Cold wetlands: darker blue tint
					h += temperature * 15 * intensityFactor;
					s = Math.max(0, Math.min(100, s + 5));
					l = Math.max(0, Math.min(100, l - 5));
				} else {
					// Warm wetlands: more vibrant green
					h = h * 0.8 + 120 * 0.2;
					s = Math.max(0, Math.min(100, s + 10));
				}
				break;

			// Low elevation areas
			case DefaultTerrainLayers.Grassland.name:
			case DefaultTerrainLayers.Lowland.name:
			case DefaultTerrainLayers.Valley.name:
				if (temperature < 0) {
					// Cold grasslands: blueish tint, less saturation
					h += temperature * 20 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 8 * intensityFactor));
					l = Math.max(0, Math.min(100, l + temperature * 3 * intensityFactor));
				} else {
					// Warm grasslands: more yellow/gold
					h -= temperature * 12 * intensityFactor;
					s = Math.max(
						0,
						Math.min(100, s + temperature * 12 * intensityFactor),
					);
					l = Math.max(0, Math.min(100, l + temperature * 3 * intensityFactor));
				}
				break;

			// Mid-to-high elevation areas
			case DefaultTerrainLayers.Highland.name:
			case DefaultTerrainLayers.Midland.name:
			case DefaultTerrainLayers.Foothills.name:
				if (temperature < 0) {
					// Cold highlands: shift towards blue/gray
					h += temperature * 25 * intensityFactor;
					s = Math.max(
						0,
						Math.min(100, s + temperature * 10 * intensityFactor),
					);
					l = Math.max(0, Math.min(100, l + temperature * 5 * intensityFactor));
				} else {
					// Warm highlands: shift towards orange/brown
					h -= temperature * 15 * intensityFactor;
					s = Math.max(
						0,
						Math.min(100, s + temperature * 15 * intensityFactor),
					);
					l = Math.max(0, Math.min(100, l + temperature * 2 * intensityFactor));
				}
				break;

			// Default case for transitions or any other terrain types
			default:
				if (temperature < 0) {
					// Cold areas: blue shift
					h += temperature * 25 * intensityFactor;
					s = Math.max(
						0,
						Math.min(100, s + temperature * 10 * intensityFactor),
					);
					l = Math.max(0, Math.min(100, l + temperature * 5 * intensityFactor));
				} else {
					// Warm areas: red/yellow shift
					h -= temperature * 15 * intensityFactor;
					s = Math.max(
						0,
						Math.min(100, s + temperature * 15 * intensityFactor),
					);
					l = Math.max(0, Math.min(100, l + temperature * 2 * intensityFactor));
				}
				break;
		}

		// Use moisture data to modify colors
		if (source.moisture > 0.3) {
			const moistureFactor = Math.min(1, (source.moisture - 0.3) * 2);

			// Check if we're dealing with water terrain types
			const isWaterType =
				base.type === DefaultTerrainLayers.DeepOcean.name ||
				base.type === DefaultTerrainLayers.Ocean.name ||
				base.type === DefaultTerrainLayers.ShallowWater.name;

			if (temperature > 0 && !isWaterType) {
				// Humid warm areas: greener (shifted towards hue 120)
				const greenInfluence = moistureFactor * 0.3;
				h = h * (1 - greenInfluence) + 120 * greenInfluence;
				s = Math.min(100, s + moistureFactor * 10);
			} else if (temperature < 0 && !isWaterType) {
				// Humid cold areas: darker blue
				s = Math.min(100, s + moistureFactor * 15);
				l = Math.max(0, l - moistureFactor * 10);
			}
		}

		// Ensure values stay in valid ranges
		h = ((h % 360) + 360) % 360;
		s = Math.max(0, Math.min(100, s));
		l = Math.max(0, Math.min(100, l));

		return {
			color: HSLA([h, s, l, 1]),
			exclusive: false,
		};
	},
};
