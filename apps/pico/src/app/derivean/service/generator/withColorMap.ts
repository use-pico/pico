// export function grayscaleFromNoise(
// 	noise: number,
// ): [number, number, number, number] {
// 	// 1. Clamp the noise to the range [-1, 1]
// 	const clamped = Math.max(-1, Math.min(1, noise));

import { hslaToRgba } from "@use-pico/common";
import type { GameConfig } from "~/app/derivean/GameConfig";

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
	export interface Props {
		/**
		 * Noise from the main biome noise map.
		 */
		noise: number;
		colorMap: GameConfig.ColorMap;
		heightmap: number;
		temperature: number;
		moisture: number;
		defaultColor?: [number, number, number, number];
	}
}

export const withColorMap = ({
	noise,
	colorMap,
	heightmap,
	temperature,
	moisture,
	defaultColor = [0, 0, 0, 0],
}: withColorMap.Props) => {
	const heightmapColor =
    colorMap.heightmap.find(({ noise }) => heightmap >= noise)?.color ||
		defaultColor;
	const temperatureColor =
    colorMap.temperature.find(({ noise }) => temperature >= noise)?.color ||
		defaultColor;
	const moistureColor =
    colorMap.moisture.find(({ noise }) => moisture >= noise)?.color || defaultColor;

	return hslaToRgba([
		clampToRange(
			heightmapColor[0] + temperatureColor[0] + moistureColor[0],
			0,
			360,
		),
		clampToRange(
			heightmapColor[1] + temperatureColor[1] + moistureColor[1],
			0,
			100,
		),
		clampToRange(
			heightmapColor[2] + temperatureColor[2] + moistureColor[2],
			0,
			100,
		),
		clampToRange(
			heightmapColor[3] + temperatureColor[3] + moistureColor[3],
			0,
			1,
		),
	]);
};
