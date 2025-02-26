import { hslaToRgba } from "@use-pico/common";
import type { Color } from "~/app/derivean/type/Color";
import type { NoiseColor } from "~/app/derivean/type/NoiseColor";
import type { NoiseType } from "~/app/derivean/type/NoiseType";

export namespace withBiomeColors {
	export interface Props {
		color: Color;
		// Global range for each noise type
		ranges: Record<NoiseType, [number, number]>;
		stops: number;
		// Factors for how much each noise type affects the color components
		factors?: Partial<Record<NoiseType, number>>;
		// Limits for saturation and lightness
		limits?: {
			saturation?: [number, number];
			lightness?: [number, number];
		};
	}
}

export const withBiomeColors = ({
	color,
	ranges,
	stops,
	factors = {},
	limits = {},
}: withBiomeColors.Props): NoiseColor[] => {
	const colorStops: NoiseColor[] = [];

	// Set default values for limits
	const saturationLimits = limits.saturation || [0, 100];
	const lightnessLimits = limits.lightness || [5, 95];

	// Default factors for each noise type
	const defaultFactors: Record<NoiseType, number> = {
		biome: 10,
		temperature: 60,
		moisture: 40,
		heightmap: 50,
		shade: 30,
	};

	// Convert base color to HSLA for easier manipulation
	const [baseH, baseS, baseL, baseA] = color;

	// Calculate the width of each sub-range for each noise type
	const rangeWidths = {
		biome: (ranges.biome[1] - ranges.biome[0]) / stops,
		heightmap: (ranges.heightmap[1] - ranges.heightmap[0]) / stops,
		temperature: (ranges.temperature[1] - ranges.temperature[0]) / stops,
		moisture: (ranges.moisture[1] - ranges.moisture[0]) / stops,
		shade: (ranges.shade[1] - ranges.shade[0]) / stops,
	};

	for (let i = 0; i < stops; i++) {
		// Calculate the sub-range for each noise type for this stop
		const biomeRange: [number, number] = [
			ranges.biome[0] + i * rangeWidths.biome,
			ranges.biome[0] + (i + 1) * rangeWidths.biome,
		];

		const heightmapRange: [number, number] = [
			ranges.heightmap[0] + i * rangeWidths.heightmap,
			ranges.heightmap[0] + (i + 1) * rangeWidths.heightmap,
		];

		const temperatureRange: [number, number] = [
			ranges.temperature[0] + i * rangeWidths.temperature,
			ranges.temperature[0] + (i + 1) * rangeWidths.temperature,
		];

		const moistureRange: [number, number] = [
			ranges.moisture[0] + i * rangeWidths.moisture,
			ranges.moisture[0] + (i + 1) * rangeWidths.moisture,
		];

		const shadeRange: [number, number] = [
			ranges.shade[0] + i * rangeWidths.shade,
			ranges.shade[0] + (i + 1) * rangeWidths.shade,
		];

		// Get the midpoint of each range to use for color modification
		const biomeMid = (biomeRange[0] + biomeRange[1]) / 2;
		const heightmapMid = (heightmapRange[0] + heightmapRange[1]) / 2;
		const temperatureMid = (temperatureRange[0] + temperatureRange[1]) / 2;
		const moistureMid = (moistureRange[0] + moistureRange[1]) / 2;
		const shadeMid = (shadeRange[0] + shadeRange[1]) / 2;

		// Apply color modifications based on noise types and their factors
		const biomeFactor =
			factors.biome === undefined ? defaultFactors.biome : factors.biome;
		const tempFactor =
			factors.temperature === undefined ?
				defaultFactors.temperature
			:	factors.temperature;
		const moistureFactor =
			factors.moisture === undefined ?
				defaultFactors.moisture
			:	factors.moisture;
		const heightmapFactor =
			factors.heightmap === undefined ?
				defaultFactors.heightmap
			:	factors.heightmap;
		const shadeFactor =
			factors.shade === undefined ? defaultFactors.shade : factors.shade;

		// Apply modifications
		const biomeHueShift = biomeMid * biomeFactor;
		const tempHueShift = temperatureMid * tempFactor;
		const moistureSaturation = baseS + moistureMid * moistureFactor;
		const heightmapLightness = baseL + heightmapMid * heightmapFactor;
		const shadeLightness = -shadeMid * shadeFactor;
		const shadeSaturation = -shadeMid * (shadeFactor / 3);

		// Combine all modifications
		const hue = (baseH + biomeHueShift + tempHueShift) % 360;
		const saturation = Math.max(
			saturationLimits[0],
			Math.min(saturationLimits[1], moistureSaturation + shadeSaturation),
		);
		const lightness = Math.max(
			lightnessLimits[0],
			Math.min(lightnessLimits[1], heightmapLightness + shadeLightness),
		);

		// Convert back to RGBA
		const [r, g, b, a] = hslaToRgba([hue, saturation, lightness, baseA]);

		colorStops.push({
			color: [Math.round(r), Math.round(g), Math.round(b), 255],
			biome: biomeRange,
			heightmap: heightmapRange,
			temperature: temperatureRange,
			moisture: moistureRange,
			shade: shadeRange,
		});
	}

	return colorStops;
};
