import { hslaToRgba, rgbaToHsla } from "@use-pico/common";
import type { Color } from "~/app/derivean/type/Color";
import type { NoiseColor } from "~/app/derivean/type/NoiseColor";
import type { NoiseType } from "~/app/derivean/type/NoiseType";

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

	const [baseH, baseS, baseL] = rgbaToHsla(color);

	for (let i = 0; i < stops; i++) {
		const t = i / (stops - 1);

		const biome = ranges.biome[0] + t * (ranges.biome[1] - ranges.biome[0]);
		const heightmap =
			ranges.heightmap[0] + t * (ranges.heightmap[1] - ranges.heightmap[0]);
		const temperature =
			ranges.temperature[0] +
			t * (ranges.temperature[1] - ranges.temperature[0]);
		const moisture =
			ranges.moisture[0] + t * (ranges.moisture[1] - ranges.moisture[0]);
		const shade = ranges.shade[0] + t * (ranges.shade[1] - ranges.shade[0]);

		// Modify the base HSL color:
		// - Adjust hue using biome and temperature.
		// - Adjust saturation using moisture.
		// - Adjust lightness using heightmap and shade.
		const newH =
			baseH +
			biome * (factors?.biome || 0) +
			temperature * (factors?.temperature || 0);
		const newS = Math.min(
			Math.max(baseS + moisture * (factors?.moisture || 0), 0),
			100,
		);
		const newL = Math.min(
			Math.max(
				baseL +
					heightmap * (factors?.heightmap || 0) -
					shade * (factors?.shade || 0),
				0,
			),
			100,
		);

		// Convert the modified HSL color back to RGB.
		const [r, g, b, a] = hslaToRgba([newH, newS, newL, 1]);

		colors.push({
			color: [Math.round(r), Math.round(g), Math.round(b), a],
			biome,
			heightmap,
			temperature,
			moisture,
			shade,
		});
	}

	return colors;
};
