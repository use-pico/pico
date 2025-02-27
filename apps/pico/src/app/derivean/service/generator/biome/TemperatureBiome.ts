import type { Biome } from "~/app/derivean/type/Biome";
import { HSLA } from "~/app/derivean/type/Color";

export const TemperatureBiome: Biome = {
	type: "Temperature",
	resolve({ color, source }) {
		// Get temperature in the -1 to 1 range
		const { temperature, heightmap } = source;

		// Determine terrain type based on heightmap thresholds
		const isDeepWater = heightmap < -0.65;
		const isWater = heightmap < 0;
		const isBeach = heightmap >= 0 && heightmap < 0.05;
		const isMountain = heightmap > 0.45;

		// Get the current HSLA values
		let [h, s, l] = color.color;

		// Calculate a temperature intensity factor
		// Using a power function to make extreme temperatures have a stronger effect
		const intensityFactor = Math.abs(temperature) ** 4;

		// Apply temperature effects based on terrain type
		if (isDeepWater) {
			if (temperature < 0) {
				// Cold deep water: subtle blue shift
				h += temperature * 5 * intensityFactor;
			} else {
				// Warm deep water: very subtle teal shift
				h += temperature * 3 * intensityFactor;
			}
		} else if (isWater) {
			if (temperature < 0) {
				// Cold water: shift towards blue
				h += temperature * 10 * intensityFactor;
				s = Math.max(0, Math.min(100, s - temperature * 5 * intensityFactor));
			} else {
				// Warm water: shift towards teal/green
				h += temperature * 15 * intensityFactor;
				l = Math.max(0, Math.min(100, l + temperature * 3 * intensityFactor));
			}
		} else if (isBeach) {
			if (temperature < 0) {
				// Cold beaches: blueish tint
				h += temperature * 15 * intensityFactor;
				s = Math.max(0, Math.min(100, s + temperature * 5 * intensityFactor));
			} else {
				// Warm beaches: more yellow
				h -= temperature * 10 * intensityFactor;
				s = Math.max(0, Math.min(100, s + temperature * 10 * intensityFactor));
				l = Math.max(0, Math.min(100, l + temperature * 5 * intensityFactor));
			}
		} else if (isMountain) {
			if (temperature < 0) {
				// Cold mountains: blue/white shift
				h += temperature * 20 * intensityFactor;
				s = Math.max(0, Math.min(100, s + temperature * 15 * intensityFactor));
				l = Math.max(0, Math.min(100, l - temperature * 10 * intensityFactor));
			} else {
				// Warm mountains: subtle reddish effect
				h -= temperature * 5 * intensityFactor;
				s = Math.max(0, Math.min(100, s + temperature * 5 * intensityFactor));
			}
		} else if (temperature < 0) {
			// Cold land: shift towards blue
			h += temperature * 25 * intensityFactor;
			s = Math.max(0, Math.min(100, s + temperature * 10 * intensityFactor));
			l = Math.max(0, Math.min(100, l + temperature * 5 * intensityFactor));
		} else {
			// Warm land: shift towards red/yellow
			h -= temperature * 15 * intensityFactor;
			s = Math.max(0, Math.min(100, s + temperature * 15 * intensityFactor));
			l = Math.max(0, Math.min(100, l + temperature * 2 * intensityFactor));
		}

		// Use moisture data if available to simulate humid areas
		if (source.moisture > 0.3) {
			const moistureFactor = Math.min(1, (source.moisture - 0.3) * 2);

			if (temperature > 0 && !isWater) {
				// Humid warm areas: greener (shifted towards hue 120)
				h = h * (1 - moistureFactor * 0.3) + 120 * moistureFactor * 0.3;
				s = Math.min(100, s + moistureFactor * 10);
			} else if (temperature < 0 && !isWater) {
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
