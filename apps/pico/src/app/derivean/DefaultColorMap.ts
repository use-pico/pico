import { type Color, HSLA } from "~/app/derivean/type/Color";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";

/**
 * Defines an ultra-granular color mapping for different noise values
 * Provides extremely fine terrain color representation
 */
export const DefaultColorMap: NoiseColorMap = (() => {
	// Configurable step size for color stops
	const COLOR_STOP_STEP = 0.02;

	const colorStops: NoiseColorMap = [];

	// Function to generate smooth color transitions
	const interpolateHSLA = (
		start: Color.HSLA,
		end: Color.HSLA,
		steps: number,
	): Color.HSLA[] => {
		return Array.from({ length: steps }, (_, i) => {
			const t = i / (steps - 1);
			return HSLA([
				start.color[0] + (end.color[0] - start.color[0]) * t, // Hue
				start.color[1] + (end.color[1] - start.color[1]) * t, // Saturation
				start.color[2] + (end.color[2] - start.color[2]) * t, // Lightness
				start.color[3] + (end.color[3] - start.color[3]) * t, // Alpha
			]);
		});
	};

	// Deep ocean color progression (5 stops)
	const deepOceanColors = interpolateHSLA(
		HSLA([240, 85, 20, 1.0]), // Slightly lighter darkest deep ocean
		HSLA([230, 75, 25, 1.0]), // Slightly lighter deep ocean
		5,
	);

	// Ocean color progression (15 stops)
	const oceanColors = interpolateHSLA(
		HSLA([220, 75, 25, 1.0]), // Deep ocean
		HSLA([180, 60, 50, 1.0]), // Coastal waters
		15,
	);

	// Coastal and shore transition (10 stops)
	const coastalColors = interpolateHSLA(
		HSLA([180, 60, 50, 1.0]), // Coastal waters
		HSLA([45, 55, 68, 1.0]), // Beach/shore
		10,
	);

	// Lowland color progression (30 stops)
	const lowlandColors = interpolateHSLA(
		HSLA([45, 55, 68, 1.0]), // Beach/shore
		HSLA([30, 45, 40, 1.0]), // Low elevation land
		30,
	);

	// Mid elevation color progression (35 stops)
	const midElevationColors = interpolateHSLA(
		HSLA([30, 45, 40, 1.0]), // Low elevation land
		HSLA([10, 25, 30, 1.0]), // Higher elevation terrain
		35,
	);

	// Mountain color progression (40 stops)
	const mountainColors = interpolateHSLA(
		HSLA([10, 25, 30, 1.0]), // Higher elevation terrain
		HSLA([0, 5, 85, 1.0]), // Snow-capped peaks
		40,
	);

	// Compile all color stops
	let currentValue = -1.0;

	// Deep Ocean
	deepOceanColors.forEach((color) => {
		colorStops.push({
			level: [currentValue, currentValue + COLOR_STOP_STEP],
			color,
		});
		currentValue += COLOR_STOP_STEP;
	});

	// Ocean Progression
	oceanColors.forEach((color) => {
		colorStops.push({
			level: [currentValue, currentValue + COLOR_STOP_STEP],
			color,
		});
		currentValue += COLOR_STOP_STEP;
	});

	// Coastal Transition
	coastalColors.forEach((color) => {
		colorStops.push({
			level: [currentValue, currentValue + COLOR_STOP_STEP],
			color,
		});
		currentValue += COLOR_STOP_STEP;
	});

	// Lowlands
	lowlandColors.forEach((color) => {
		colorStops.push({
			level: [currentValue, currentValue + COLOR_STOP_STEP],
			color,
		});
		currentValue += COLOR_STOP_STEP;
	});

	// Mid Elevation
	midElevationColors.forEach((color) => {
		colorStops.push({
			level: [currentValue, currentValue + COLOR_STOP_STEP],
			color,
		});
		currentValue += COLOR_STOP_STEP;
	});

	// Mountains and Peaks
	mountainColors.forEach((color) => {
		colorStops.push({
			level: [currentValue, currentValue + COLOR_STOP_STEP],
			color,
		});
		currentValue += COLOR_STOP_STEP;
	});

	return colorStops;
})();
