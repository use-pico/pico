import { flow } from "fp-ts/lib/function";
import { fpClamp } from "~/app/derivean/fp/fpClamp";
import type { Noise } from "~/app/derivean/type/Noise";
import type { XZ } from "~/app/derivean/type/XZ";

export namespace fpCombineNoise {
	export interface Props {
		noise1: {
			noise: Noise;
			weight: number;
		};
		noise2: {
			noise: Noise;
			weight: number;
		};
	}
}

export const fpCombineNoise = ({
	noise1,
	noise2,
}: fpCombineNoise.Props): Noise => {
	return flow(
		(xz: XZ) =>
			noise1.noise(xz) * noise1.weight + noise2.noise(xz) * noise2.weight,
		fpClamp({ min: -1, max: 1 }),
	);
};
