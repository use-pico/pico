import { hslaToRgba } from "@use-pico/common";
import { GameConfig } from "~/app/derivean/GameConfig";

// export function grayscaleFromNoise(
// 	noise: number,
// ): [number, number, number, number] {
// 	// 1. Clamp the noise to the range [-1, 1]
// 	const clamped = Math.max(-1, Math.min(1, noise));

// 	// 2. Map from [-1, 1] to [0, 255]
// 	//    -1 -> 0, 1 -> 255
// 	const gray = Math.floor(((clamped + 1) / 2) * 255);

// 	// 3. Return as [R, G, B, A] with full opacity
// 	return [gray, gray, gray, 255];
// }

export const clampToRange = (value: number, min: number, max: number) => {
	return Math.max(min, Math.min(max, value));
};

export namespace withColorMap {
	export type Biome = Record<GameConfig.NoiseSource, number> & {
		map: GameConfig.ColorMap;
		weight: number;
	};

	export interface Props {
		biomes: Biome[];
		defaultColor?: [number, number, number, number];
	}
}

export const withColorMap = ({
	biomes,
	defaultColor = [0, 0, 0, 0],
}: withColorMap.Props) => {
	const colors = biomes.map(
		({ map, heightmap, biome, temperature, moisture, weight }) => {
			const heightmapColor =
				map.heightmap.find(({ noise }) => heightmap >= noise)?.color ||
				defaultColor;
			const biomeColor =
				map.biome.find(({ noise }) => biome >= noise)?.color || defaultColor;
			const temperatureColor =
				map.temperature.find(({ noise }) => temperature >= noise)?.color ||
				defaultColor;
			const moistureColor =
				map.moisture.find(({ noise }) => moisture >= noise)?.color ||
				defaultColor;

			return {
				color: hslaToRgba([
					Math.max(
						0,
						Math.min(
							360,
							heightmapColor[0] +
								biomeColor[0] +
								temperatureColor[0] +
								moistureColor[0],
						),
					),
					Math.max(
						0,
						Math.min(
							100,
							heightmapColor[1] +
								biomeColor[1] +
								temperatureColor[1] +
								moistureColor[1],
						),
					),
					Math.max(
						0,
						Math.min(
							100,
							heightmapColor[2] +
								biomeColor[2] +
								temperatureColor[2] +
								moistureColor[2],
						),
					),
					Math.max(
						0,
						Math.min(
							1,
							heightmapColor[3] +
								biomeColor[3] +
								temperatureColor[3] +
								moistureColor[3],
						),
					),
				]),
				weight,
			};
		},
	);

	const exponent = 2;
	let totalWeight = 0;
	let [r, g, b, a] = [0, 0, 0, 0];

	for (const { color, weight } of colors) {
		const adjustedWeight = weight ** exponent;
		r += color[0] * adjustedWeight;
		g += color[1] * adjustedWeight;
		b += color[2] * adjustedWeight;
		a += color[3] * adjustedWeight;
		totalWeight += adjustedWeight;
	}

	if (totalWeight > 0) {
		r /= totalWeight;
		g /= totalWeight;
		b /= totalWeight;
		a /= totalWeight;
	}

	return [r, g, b, a];
};
