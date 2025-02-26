import { hslaToRgba, rgbaToHsla } from "@use-pico/common";
import type { Color } from "~/app/derivean/type/Color";
import type { NoiseColor } from "~/app/derivean/type/NoiseColor";
import type { NoiseType } from "~/app/derivean/type/NoiseType";

const interpolate = ([min, max]: [number, number], t: number) => {
	return min + t * (max - min);
};

export namespace withBiomeColors {
	export interface Props {
		color: Color;
		ranges: Record<NoiseType, [number, number]>;
		factors?: Partial<Record<NoiseType, number>>;
		stops: number;
	}
}

export const withBiomeColors = ({
	color,
	ranges,
	factors,
	stops,
}: withBiomeColors.Props): NoiseColor[] => {
	const colors: NoiseColor[] = [];

	const [H, S, L] = rgbaToHsla(color);

	for (let i = 0; i < stops; i++) {
		const t = i / (stops - 1);

		const biome = interpolate(ranges.biome, t);
		const heightmap = interpolate(ranges.heightmap, t);
		const temperature = interpolate(ranges.temperature, t);
		const moisture = interpolate(ranges.moisture, t);
		const shade = interpolate(ranges.shade, t);

		// Modify the base HSL color:
		// - Adjust hue using biome and temperature.
		// - Adjust saturation using moisture.
		// - Adjust lightness using heightmap and shade.
		const hue =
			H +
			biome * (factors?.biome || 0) +
			temperature * (factors?.temperature || 0);
		const saturation = Math.min(
			Math.max(S + moisture * (factors?.moisture || 0), 0),
			100,
		);
		const lightness = Math.min(
			Math.max(
				L +
					heightmap * (factors?.heightmap || 0) -
					shade * (factors?.shade || 0),
				0,
			),
			100,
		);

		// Convert the modified HSL color back to RGB.
		const [r, g, b, a] = hslaToRgba([hue, saturation, lightness, 1]);

		colors.push({
			color: [Math.round(r), Math.round(g), Math.round(b), Math.round(a)],
			biome,
			heightmap,
			temperature,
			moisture,
			shade,
		});
	}

	return colors;
};
