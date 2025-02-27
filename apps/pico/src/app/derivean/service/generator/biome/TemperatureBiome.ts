import { DefaultTerrainLayers } from "~/app/derivean/service/DefaultTerrainLayers";
import type { Biome } from "~/app/derivean/type/Biome";
import { HSLA } from "~/app/derivean/type/Color";

export const TemperatureBiome: Biome = {
	type: "Temperature",
	resolve({ color, source, base }) {
		// Get temperature in the -1 to 1 range
		const { temperature } = source;

		// Skip minimal temperature changes for better performance
		if (Math.abs(temperature) < 0.05) {
			return undefined;
		}

		// Get the current HSLA values
		let [h, s, l] = color.color;

		// Reduce the intensity factor to make effects more subtle
		// Square root function makes extreme values less extreme
		const intensityFactor = Math.sqrt(Math.abs(temperature)) * 1.5;

		// Apply temperature effects based on terrain type from base.type
		switch (base.type) {
			// Water bodies
			case DefaultTerrainLayers.DeepOcean.name:
				if (temperature < 0) {
					// Cold deep water: subtle blue shift
					h += temperature * 2 * intensityFactor;
				} else {
					// Warm deep water: very subtle teal shift
					h += temperature * intensityFactor;
				}
				break;

			case DefaultTerrainLayers.Ocean.name:
			case DefaultTerrainLayers.ShallowWater.name:
				if (temperature < 0) {
					// Cold water: shift towards blue
					h += temperature * 4 * intensityFactor;
					s = Math.max(0, Math.min(100, s - temperature * 2 * intensityFactor));
				} else {
					// Warm water: shift towards teal/green
					h += temperature * 5 * intensityFactor;
					l = Math.max(0, Math.min(100, l + temperature * intensityFactor));
				}
				break;

			// Coastal areas
			case DefaultTerrainLayers.Beach.name:
			case DefaultTerrainLayers.Coast.name:
			case DefaultTerrainLayers.Foam.name:
				if (temperature < 0) {
					// Cold beaches: blueish tint
					h += temperature * 5 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 2 * intensityFactor));
				} else {
					// Warm beaches: more yellow
					h -= temperature * 3 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 4 * intensityFactor));
					l = Math.max(0, Math.min(100, l + temperature * 2 * intensityFactor));
				}
				break;

			// Mountain regions
			case DefaultTerrainLayers.Mountain.name:
			case DefaultTerrainLayers.HighMountain.name:
			case DefaultTerrainLayers.MountainPeak.name:
				if (temperature < 0) {
					// Cold mountains: blue/white shift (snow effect)
					h += temperature * 8 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 6 * intensityFactor));
					l = Math.max(0, Math.min(100, l - temperature * 4 * intensityFactor));
				} else {
					// Warm mountains: subtle reddish effect
					h -= temperature * 2 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 2 * intensityFactor));
				}
				break;

			// Wetlands
			case DefaultTerrainLayers.Wetland.name:
				if (temperature < 0) {
					// Cold wetlands: darker blue tint
					h += temperature * 6 * intensityFactor;
					s = Math.max(0, Math.min(100, s + 2));
					l = Math.max(0, Math.min(100, l - 2));
				} else {
					// Warm wetlands: more vibrant green
					// Less dramatic mixing with green
					h = h * 0.9 + 120 * 0.1;
					s = Math.max(0, Math.min(100, s + 5));
				}
				break;

			// Low elevation areas
			case DefaultTerrainLayers.Grassland.name:
			case DefaultTerrainLayers.Lowland.name:
			case DefaultTerrainLayers.Valley.name:
				if (temperature < 0) {
					// Cold grasslands: blueish tint, less saturation
					h += temperature * 7 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 3 * intensityFactor));
					l = Math.max(0, Math.min(100, l + temperature * intensityFactor));
				} else {
					// Warm grasslands: more yellow/gold
					h -= temperature * 4 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 5 * intensityFactor));
					l = Math.max(0, Math.min(100, l + temperature * intensityFactor));
				}
				break;

			// Mid-to-high elevation areas
			case DefaultTerrainLayers.Highland.name:
			case DefaultTerrainLayers.Midland.name:
			case DefaultTerrainLayers.Foothills.name:
				if (temperature < 0) {
					// Cold highlands: shift towards blue/gray
					h += temperature * 8 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 4 * intensityFactor));
					l = Math.max(0, Math.min(100, l + temperature * 2 * intensityFactor));
				} else {
					// Warm highlands: shift towards orange/brown
					h -= temperature * 5 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 6 * intensityFactor));
					l = Math.max(0, Math.min(100, l + temperature * intensityFactor));
				}
				break;

			// Default case for transitions or any other terrain types
			default:
				if (temperature < 0) {
					// Cold areas: blue shift (more subtle)
					h += temperature * 8 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 4 * intensityFactor));
					l = Math.max(0, Math.min(100, l + temperature * 2 * intensityFactor));
				} else {
					// Warm areas: red/yellow shift (more subtle)
					h -= temperature * 5 * intensityFactor;
					s = Math.max(0, Math.min(100, s + temperature * 6 * intensityFactor));
					l = Math.max(0, Math.min(100, l + temperature * intensityFactor));
				}
				break;
		}

		// Use moisture data to modify colors - make this more subtle too
		if (source.moisture > 0.3) {
			const moistureFactor = Math.min(0.6, (source.moisture - 0.3) * 1.2);

			// Check if we're dealing with water terrain types
			const isWaterType =
				base.type === DefaultTerrainLayers.DeepOcean.name ||
				base.type === DefaultTerrainLayers.Ocean.name ||
				base.type === DefaultTerrainLayers.ShallowWater.name;

			if (temperature > 0 && !isWaterType) {
				// Humid warm areas: greener (shifted towards hue 120) - more subtle
				const greenInfluence = moistureFactor * 0.15;
				h = h * (1 - greenInfluence) + 120 * greenInfluence;
				s = Math.min(100, s + moistureFactor * 5);
			} else if (temperature < 0 && !isWaterType) {
				// Humid cold areas: darker blue - more subtle
				s = Math.min(100, s + moistureFactor * 7);
				l = Math.max(0, l - moistureFactor * 5);
			}
		}

		// Prevent extreme color shifts by limiting the total amount of change
		// Calculate the difference between original and new values
		const [originalH] = color.color;
		const hDiff = Math.abs(h - originalH);

		// If the hue has changed too much, limit it
		if (hDiff > 30) {
			// Limit how far the hue can shift
			const hueDirection = h > originalH ? 1 : -1;
			h = originalH + 30 * hueDirection;
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
