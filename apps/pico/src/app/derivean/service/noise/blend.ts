import type { Noise } from "~/app/derivean/service/noise/Noise";
import { smoothstep } from "~/app/derivean/service/noise/smoothstep";

export namespace blend {
	export interface Props {
		x: number;
		z: number;
		scale?: [number, number];
		limit?: [number, number];
		sourceNoise: Noise;
		controlNoise: Noise;
	}
}

/**
 * Returns a blended noise value based on two different frequency scales.
 * When zoomed out, the map will show distinct regions dominated by one scale or the other.
 */
export function blend({
	x,
	z,
	scale: [lowScale, highScale] = [0.5, 2.0],
	limit: [min, max] = [0.4, 0.6],
	sourceNoise,
	controlNoise,
}: blend.Props): number {
	const blend = smoothstep(min, max, (controlNoise(x, z) + 1) / 2);

	return (
		sourceNoise(x * lowScale, z * lowScale) * (1 - blend) +
		sourceNoise(x * highScale, z * highScale) * blend
	);
}
