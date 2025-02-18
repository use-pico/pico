import { cellular } from "~/app/derivean/service/noise/cellular";
import { cubic } from "~/app/derivean/service/noise/cubic";
import { fractal } from "~/app/derivean/service/noise/fractal";
import { perlin } from "~/app/derivean/service/noise/perlin";
import { simplex } from "~/app/derivean/service/noise/simplex";
import { simplexPerlin } from "~/app/derivean/service/noise/simplexPerlin";
import { warp } from "~/app/derivean/service/noise/warp";

const defaultOffset = 10;

namespace NoiseFactory {
	export type Type = keyof typeof NoiseFactory;
}

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
	export interface Layer {
		/**
		 * Just for finetuning the layer.
		 */
		disabled?: boolean;
		noise?: NoiseFactory.Type;
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
		 * Boosts the overall sum from the layer.
		 */
		boost?: number;
		/**
		 * Subtracts the value from the overall sum.
		 */
		subtract?: boolean;
	}

	export interface Props {
		seed: string;
		layers: Layer[];
	}
}

export const withNoise = ({ seed, layers }: withNoise.Props) => {
	const noiseGroups = layers.map(({ noise, name }) => {
		return NoiseFactory[noise || "simplex"](`${seed}-${name}`);
	});

	return (x: number, z: number) => {
		const value = layers
			.filter((layer) => !layer.disabled)
			.reduce((sum, { scale, boost, subtract, weight }, index) => {
				let value = noiseGroups[index]!(x * scale, z * scale);

				value = (value + 1) / 2;

				if (boost) {
					value *= boost;
				}

				if (subtract) {
					value *= -1;
				}

				value = sum + value;
				value += value * (weight || 0);

				return value;
			}, 0);

		return Math.min(1, Math.max(0, value));
	};
};
