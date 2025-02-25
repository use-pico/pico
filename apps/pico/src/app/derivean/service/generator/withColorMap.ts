import { hslaToRgba } from "@use-pico/common";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";
import type { NoiseType } from "~/app/derivean/type/NoiseType";

export const clampToRange = (value: number, min: number, max: number) => {
	return Math.max(min, Math.min(max, value));
};

export namespace withColorMap {
	export interface Props {
		colorMap: NoiseColorMap;
		source: Record<NoiseType, number>;
		defaultColor?: [number, number, number, number];
	}
}

export const withColorMap = ({
	colorMap,
	source,
	defaultColor = [0, 0, 0, 0],
}: withColorMap.Props) => {
	const biomeColor =
		colorMap.biome.find(({ noise }) => source.biome >= noise)?.color ||
		defaultColor;
	const heightmapColor =
		colorMap.heightmap.find(({ noise }) => source.heightmap >= noise)?.color ||
		defaultColor;
	const temperatureColor =
		colorMap.temperature.find(({ noise }) => source.temperature >= noise)
			?.color || defaultColor;
	const moistureColor =
		colorMap.moisture.find(({ noise }) => source.moisture >= noise)?.color ||
		defaultColor;
	const shadeColor =
		colorMap.shade.find(({ noise }) => source.shade >= noise)?.color ||
		defaultColor;

	return hslaToRgba([
		clampToRange(
			biomeColor[0] +
				heightmapColor[0] +
				temperatureColor[0] +
				moistureColor[0] +
				shadeColor[0],
			0,
			360,
		),
		clampToRange(
			biomeColor[1] +
				heightmapColor[1] +
				temperatureColor[1] +
				moistureColor[1] +
				shadeColor[1],
			0,
			100,
		),
		clampToRange(
			biomeColor[2] +
				heightmapColor[2] +
				temperatureColor[2] +
				moistureColor[2] +
				shadeColor[2],
			0,
			100,
		),
		clampToRange(
			biomeColor[3] +
				heightmapColor[3] +
				temperatureColor[3] +
				moistureColor[3] +
				shadeColor[3],
			0,
			1,
		),
	]);
};
