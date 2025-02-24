import { rangeOf } from "@use-pico/common";
import { cellular } from "~/app/derivean/service/noise/cellular";
import { cubic } from "~/app/derivean/service/noise/cubic";
import { fractal } from "~/app/derivean/service/noise/fractal";
import { perlin } from "~/app/derivean/service/noise/perlin";
import { simplex } from "~/app/derivean/service/noise/simplex";
import { simplexPerlin } from "~/app/derivean/service/noise/simplexPerlin";
import { warp } from "~/app/derivean/service/noise/warp";

const defaultOffset = 10;

const NoiseFactory = {
	simplex,
	perlin,
	cellular,
	cubic,
	simplexPerlin,
	simplexPerlinFractal(seed: string) {
		return fractal({ noise: simplexPerlin(seed) });
	},
	simplexFractal(seed: string) {
		return fractal({ noise: simplex(seed) });
	},
	perlinFractal(seed: string) {
		return fractal({ noise: perlin(seed) });
	},

	simplexWarpX(seed: string) {
		return warp({ noise: simplex(seed), offsetX: defaultOffset });
	},
	simplexWarpZ(seed: string) {
		return warp({ noise: simplex(seed), offsetZ: defaultOffset });
	},

	simplexFractalWarpX(seed: string) {
		return warp({
			noise: fractal({ noise: simplex(seed) }),
			offsetX: defaultOffset,
		});
	},
	simplexFractalWarpZ(seed: string) {
		return warp({
			noise: fractal({ noise: simplex(seed) }),
			offsetZ: defaultOffset,
		});
	},

	perlinWarpX(seed: string) {
		return warp({ noise: perlin(seed), offsetX: defaultOffset });
	},
	perlinWarpZ(seed: string) {
		return warp({ noise: perlin(seed), offsetZ: defaultOffset });
	},

	perlinFractalWarpX(seed: string) {
		return warp({
			noise: fractal({ noise: perlin(seed) }),
			offsetX: defaultOffset,
		});
	},
	perlinFractalWarpZ(seed: string) {
		return warp({
			noise: fractal({ noise: perlin(seed) }),
			offsetZ: defaultOffset,
		});
	},
} as const;

export namespace withNoise {
	export type NoiseFactory = (seed: string) => (x: number, z: number) => number;
	export type Noise<TNoise extends string> = Record<TNoise, NoiseFactory>;

	export interface Layer<TNoise extends string> {
		/**
		 * Just for fine-tuning the layer.
		 */
		disabled?: boolean;
		/**
		 * Which noise to use in this layer.
		 */
		noise: TNoise;
		/**
		 * Name of the layer, modifies seed.
		 */
		name: string;
		/**
		 * Scale of the noise.
		 */
		scale: number;
		/**
		 * Weight of the noise (applied directly on noise value).
		 */
		weight?: number;
		/**
		 * Subtracts the value from the overall sum.
		 */
		inverse?: boolean;
		limit?: {
			min?: number;
			max?: number;
		};
	}

	export interface Variation<TNoise extends string> {
		/**
		 * Name of this variation, used also as a seed modifier
		 */
		name: string;
		/**
		 * Layers of this variation, those layers are used generate final
		 * noise value.
		 */
		layers: Layer<TNoise>[];
		/**
		 * Weight of this variation (applied directly on noise value).
		 *
		 * This is useful when there are more variations.
		 */
		weight: number;
		/**
		 * Minimum range when a variation noise runs
		 */
		min: number;
		/**
		 * Maximum range when a variation noise runs
		 */
		max: number;
	}

	export interface Props<TNoise extends string> {
		/**
		 * Define random seed for this noise.
		 */
		seed: string;
		/**
		 * Individual noises available for this generator.
		 */
		noise: Noise<TNoise>;
		/**
		 * Define individual layers this noise is composed of.
		 *
		 * This is the main magick used to generate noise.
		 */
		layers: NoInfer<Layer<TNoise>[]>;
		/**
		 * Defines variation on different levels, so e.g. mountain tops or deep water levels could
		 * get processed more to look more natural, or at least, more interesting.
		 */
		variation?: NoInfer<Variation<TNoise>[]>;
	}
}

const noiseOf = <TNoise extends string>(
	x: number,
	z: number,
	seed: string,
	layers: withNoise.Layer<TNoise>[],
	noise: withNoise.Noise<TNoise>,
) => {
	const generator = layers.map(({ noise: type, name }) => {
		return noise[type](`${seed}-${name}`);
	});

	const value = layers
		.filter((layer) => !layer.disabled)
		.reduce((sum, { scale, inverse, weight, limit }, index) => {
			let value = generator[index]!(x * scale, z * scale);

			if (weight) {
				value *= weight;
			}

			if (inverse) {
				value *= -1;
			}

			if (limit) {
				if (limit.min !== undefined) {
					value = Math.max(limit.min, value);
				}

				if (limit.max !== undefined) {
					value = Math.min(limit.max, value);
				}
			}

			value = sum + value;

			return value;
		}, 0);

	return Math.max(-1, Math.min(1, value));
};

export const withNoise = <const TNoise extends string>({
	seed,
	noise,
	layers,
	variation = [],
}: withNoise.Props<TNoise>) => {
	return (x: number, z: number) => {
		let value = noiseOf(x, z, seed, layers, noise);

		const mix = variation.find(({ min, max }) => min <= value && value <= max);
		if (mix) {
			/**
			 * Even variations supports individual layers for nicer results.
			 */
			const adjust = noiseOf(x, z, seed, mix.layers, noise);

			/**
			 * A little magic:
			 * rangeOf takes noise value (-1 to 1) and converts it to a value in the available range from the
			 * variation (e.g 0.95 to 1).
			 *
			 * If a number should be subtracted, a negative weight should be provided.
			 */
			value =
				rangeOf({ value: adjust, input: { min: -1, max: 1 }, output: mix }) *
				mix.weight;
		}

		return Math.max(-1, Math.min(1, value));
	};
};
