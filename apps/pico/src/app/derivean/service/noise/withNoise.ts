import { toSeed } from "@use-pico/common";
import { XORWow } from "random-seedable";
import { createNoise2D } from "simplex-noise";

export namespace withNoise {
	export interface Layer {
		/**
		 * Just for finetuning the layer.
		 */
		disabled?: boolean;
		name: string;
		/**
		 * Scale of the noise.
		 */
		scale: number;
		/**
		 * Weight of the noise (applied directly on noise value).
		 */
		weight: number;
		/**
		 * Boosts the overall sum from the layer.
		 */
		boost?: number;
		/**
		 * Inverts the result.
		 */
		inverse?: boolean;
		/**
		 * Limit cuts off values outside of it's range.
		 */
		crop?: {
			min?: number;
			max?: number;
			/**
			 * Value to use when crop is active.
			 */
			value?: number;
		};
		/**
		 * Soft limit (uses min/max as a range). Always generates a value.
		 */
		limit?: {
			min: number;
			max: number;
		};
	}

	export interface Layers {
		/**
		 * Just for finetuning the layer.
		 */
		disabled?: boolean;
		name: string;
		layers: Layer[];
		weight: number;
		boost?: number;
		inverse?: boolean;
		crop?: {
			min?: number;
			max?: number;
			value?: number;
		};
		limit?: {
			min: number;
			max: number;
		};
	}

	export interface Props {
		seed: string;
		layers: Layers[];
	}
}

export const withNoise = ({ seed, layers }: withNoise.Props) => {
	const noiseGroups = layers.map(({ layers, name: group }) =>
		layers.map(({ name }) => {
			const random = new XORWow(toSeed(`${seed}-${group}-${name}`));
			return createNoise2D(() => random.float());
		}),
	);

	return (x: number, z: number) => {
		const value = layers
			.filter((layer) => !layer.disabled)
			.reduce((sum, group, groupIndex) => {
				let value = group.layers
					.filter((layer) => !layer.disabled)
					.reduce((layerSum, layer, layerIndex) => {
						let value = noiseGroups[groupIndex]![layerIndex]!(
							x * layer.scale,
							z * layer.scale,
						);

						value = (value + 1) / 2;

						if (layer.limit) {
							value = Math.min(
								layer.limit.max,
								Math.max(layer.limit.min, value),
							);
						}

						if (layer.crop) {
							if (layer.crop.min && value < layer.crop.min) {
								value = layer.crop.value || 0;
							}
							if (layer.crop.max && value > layer.crop.max) {
								value = layer.crop.value || 0;
							}
						}

						if (layer.boost) {
							value *= layer.boost;
						}

						if (layer.inverse) {
							value *= -1;
						}

						value = layerSum + value * layer.weight;

						return value;
					}, 0);

				if (group.limit) {
					value = Math.min(group.limit.max, Math.max(group.limit.min, value));
				}
				if (group.crop) {
					if (group.crop.min && value < group.crop.min) {
						value = group.crop.value || 0;
					}
					if (group.crop.max && value > group.crop.max) {
						value = group.crop.value || 0;
					}
				}

				if (group.boost) {
					value *= group.boost;
				}

				if (group.inverse) {
					value *= -1;
				}

				value = sum + value * group.weight;

				return value;
			}, 0);

		return Math.min(1, Math.max(0, value));
	};
};
