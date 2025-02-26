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
	return (
		colorMap.find((color) => {
			/**
			 * That edge case when there is just a first color. This does not make a lot of sense.
			 */
			if (
				!color.biome &&
				!color.heightmap &&
				!color.temperature &&
				!color.moisture &&
				!color.shade
			) {
				return color.color;
			}

			return (
				(color.biome ? source.biome >= color.biome : true) &&
				(color.heightmap ? source.heightmap >= color.heightmap : true) &&
				(color.temperature ? source.temperature >= color.temperature : true) &&
				(color.moisture ? source.moisture >= color.moisture : true) &&
				(color.shade ? source.shade >= color.shade : true)
			);
		})?.color || defaultColor
	);
};
