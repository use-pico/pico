import type { NoiseColor } from "~/app/derivean/type/NoiseColor";

export namespace createStops {
	export interface Props {
		steps: number;
		limit: [number, number];
		hueRange: [number, number];
		saturationRange: [number, number];
		lightnessRange: [number, number];
	}
}

/**
 * Generates stops array based on a given working range (a subset of [-1, 1])
 * and number of steps. The working range determines the noise values to use,
 * while the interpolation maps that range to a 0–1 factor for color interpolation.
 * HLS parameters are configurable via [min, max] pairs.
 *
 * @param steps Number of heightmap stops to generate.
 * @param limit A tuple [min, max] that must lie within [-1, 1].
 * @param hueRange A tuple [minHue, maxHue] in degrees.
 * @param saturationRange A tuple [minSaturation, maxSaturation] in percent.
 * @param lightnessRange A tuple [minLightness, maxLightness] in percent.
 * @returns An array of GameConfig.Color objects.
 */
export function createStops({
	steps,
	limit,
	hueRange,
	saturationRange,
	lightnessRange,
}: createStops.Props): NoiseColor[] {
	const [minNoise, maxNoise] = limit;
	return Array.from({ length: steps }, (_, i) => {
		// Linearly interpolate noise value between minNoise and maxNoise.
		const noise = minNoise + (i * (maxNoise - minNoise)) / (steps - 1);
		// Map noise from [minNoise, maxNoise] to [0, 1]
		const t = (noise - minNoise) / (maxNoise - minNoise);

		// Interpolate each HLS parameter.
		const hue = hueRange[0] + (hueRange[1] - hueRange[0]) * t;
		const saturation =
			saturationRange[0] + (saturationRange[1] - saturationRange[0]) * t;
		const lightness =
			lightnessRange[0] + (lightnessRange[1] - lightnessRange[0]) * t;

		return {
			noise,
			color: [hue, saturation, lightness, 1],
		} as NoiseColor;
	}).sort((a, b) => b.noise - a.noise);
}
