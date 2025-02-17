import { toSeed } from "@use-pico/common";
import { XORWow } from "random-seedable";
import { createNoise2D } from "simplex-noise";

export namespace withNoise {
	export interface Layer {
		name: string;
		scale: number;
		weight: number;
		inverse?: boolean;
		limit?: {
			min: number;
			max: number;
		};
	}

	export interface Layers {
		name: string;
		layers: Layer[];
		weight: number;
		inverse?: boolean;
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
		const value = layers.reduce((sum, group, groupIndex) => {
			let value = group.layers.reduce((layerSum, layer, layerIndex) => {
				let value = noiseGroups[groupIndex]![layerIndex]!(
					x * layer.scale,
					z * layer.scale,
				);

				value = (value + 1) / 2;

				if (layer.limit) {
					value = Math.min(layer.limit.max, Math.max(layer.limit.min, value));
				}

				value = layerSum + value * layer.weight;

				if (layer.inverse) {
					value = 1 - value;
				}

				return value;
			}, 0);

			if (group.limit) {
				value = Math.min(group.limit.max, Math.max(group.limit.min, value));
			}

			value = sum + value * group.weight;

			if (group.inverse) {
				/**
				 * Value here is normalized value (0-1), so the subtraction.
				 */
				value = 1 - value;
			}

			return value;
		}, 0);

		return Math.min(1, Math.max(0, value));
	};
};
