import { rangeOf } from "@use-pico/common";
import type { Noise } from "~/app/derivean/type/Noise";
import type { NoiseFactory } from "~/app/derivean/type/NoiseFactory";

export namespace withNoise {
	export interface Layer {
		/**
		 * Just for fine-tuning the layer.
		 */
		disabled?: boolean;
		/**
		 * Which noise to use in this layer.
		 */
		noise: NoiseFactory;
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

	export interface Variation {
		/**
		 * Name of this variation, used also as a seed modifier
		 */
		name: string;
		/**
		 * Layers of this variation, those layers are used generate final
		 * noise value.
		 */
		layers: Layer[];
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

	export interface Props {
		/**
		 * Define random seed for this noise.
		 */
		seed: string;
		/**
		 * Define individual layers this noise is composed of.
		 *
		 * This is the main magick used to generate noise.
		 */
		layers: Layer[];
		/**
		 * Defines variation on different levels, so e.g. mountain tops or deep water levels could
		 * get processed more to look more natural, or at least, more interesting.
		 */
		variation?: Variation[];
	}
}

const noiseOf = (
	x: number,
	z: number,
	seed: string,
	layers: withNoise.Layer[],
) => {
	/**
	 * TODO This may be eventually optimized, so it's not created per each pixel.
	 *
	 * Note that variations needs generators too
	 */
	const generator = layers
		.filter((layer) => !layer.disabled)
		.map(({ noise, name }) => noise(`${seed}-${name}`));

	const value = layers
		.filter((layer) => !layer.disabled)
		.reduce((sum, { scale, inverse, weight, limit }, index) => {
			let value = generator[index]!([x * scale, z * scale]);

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

export const withNoise = ({
	seed,
	layers,
	variation = [],
}: withNoise.Props): Noise => {
	return ([x, z]) => {
		let value = noiseOf(x, z, seed, layers);

		const mix = variation.find(({ min, max }) => min <= value && value <= max);
		if (mix) {
			/**
			 * Even variations supports individual layers for nicer results.
			 */
			const adjust = noiseOf(x, z, seed, mix.layers);

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
