import { RGBA, type Color } from "~/app/derivean/type/Color";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";
import type { NoiseType } from "~/app/derivean/type/NoiseType";
import { hslaToRgba } from "~/app/derivean/utils/hslaToRgba";

export namespace withColorMap {
	export interface Props {
		/**
		 * Color map used to convert noise values to colors
		 */
		colorMap: NoiseColorMap;
		/**
		 * Various noise sources that can be used for coloring
		 */
		source: Partial<Record<NoiseType, number>>;
	}
}

/**
 * Maps a noise value to an RGBA color based on the provided color map
 * Currently uses heightmap as the primary source for color mapping
 */
export const withColorMap = ({
	colorMap,
	source,
}: withColorMap.Props): Color.RGBA => {
	// Use heightmap noise as the primary source for terrain color
	const noiseValue = source.heightmap ?? 0;

	// Find the appropriate color stop for the current noise value
	for (const { level, color } of colorMap) {
		const [min, max] = level;

		if (noiseValue >= min && noiseValue <= max) {
			// Convert HSLA to RGBA for the texture
			return hslaToRgba(color);
		}
	}

	// Fallback color (should not happen with proper color map coverage)
	return RGBA([128, 128, 128, 255]);
};
