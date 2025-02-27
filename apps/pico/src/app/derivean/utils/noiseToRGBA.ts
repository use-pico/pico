import { RGBA, type Color } from "~/app/derivean/type/Color";

export function noiseToRGBA(noise: number): Color.RGBA {
	const clampedNoise = Math.max(-1, Math.min(1, noise));
	const normalizedNoise = (clampedNoise + 1) / 2;

	return RGBA([
		Math.round(normalizedNoise * 255),
		Math.round((1 - Math.abs(clampedNoise)) * 255),
		Math.round((1 - normalizedNoise) * 255),
		255,
	]);
}
