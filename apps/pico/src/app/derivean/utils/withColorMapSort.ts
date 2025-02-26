import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";
import type { NoiseType } from "~/app/derivean/type/NoiseType";

export const withColorMapSort = (colorMap: NoiseColorMap): NoiseColorMap => {
	return colorMap.slice().sort((a, b) => {
		const keys: NoiseType[] = [
			"biome",
			"heightmap",
			"temperature",
			"moisture",
			"shade",
		];

		for (const key of keys) {
			const bVal = b[key] === undefined ? -Infinity : b[key]!;
			const aVal = a[key] === undefined ? -Infinity : a[key]!;
			if (aVal !== bVal) {
				return bVal - aVal;
			}
		}

		return 0;
	});
};
