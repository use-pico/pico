import { toSeed } from "@use-pico/common";
import { XORWow } from "random-seedable";
import { createNoise2D } from "simplex-noise";

export namespace withNoise {
	export interface Layer {
		name: string;
		scale: number;
		weight: number;
		limit?: {
			min: number;
			max: number;
		};
	}

	export interface Layers {
		name: string;
		layers: Layer[];
		weight: number;
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
		const combinedNoise = layers.reduce((sum, group, groupIndex) => {
			const groupNoise = group.layers.reduce((layerSum, layer, layerIndex) => {
				const sum =
					layerSum +
					((noiseGroups[groupIndex]![layerIndex]!(
						x * layer.scale,
						z * layer.scale,
					) +
						1) /
						2) *
						layer.weight;

				if (layer.limit) {
					return Math.min(layer.limit.max, Math.max(layer.limit.min, sum));
				}

				return sum;
			}, 0);

			const $sum = (sum + groupNoise) * group.weight;

			if (group.limit) {
				return Math.min(group.limit.max, Math.max(group.limit.min, $sum));
			}

			return $sum;
		}, 0);

		return Math.min(1, combinedNoise);
	};
};
