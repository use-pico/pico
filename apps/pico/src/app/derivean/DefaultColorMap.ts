import { Color, HSLA } from "~/app/derivean/type/Color";
import type { NoiseColorMap } from "~/app/derivean/type/NoiseColorMap";

export const DefaultColorMap: NoiseColorMap = (() => {
	const interpolateHSLA = (
		start: Color.HSLA,
		end: Color.HSLA,
		steps: number,
	): Color.HSLA[] => {
		return Array.from({ length: steps }, (_, i) => {
			const t = i / (steps - 1);
			return HSLA([
				start.color[0] + (end.color[0] - start.color[0]) * t,
				start.color[1] + (end.color[1] - start.color[1]) * t,
				start.color[2] + (end.color[2] - start.color[2]) * t,
				start.color[3] + (end.color[3] - start.color[3]) * t,
			]);
		});
	};

	const terrainSections = [
		{
			start: -1.0,
			end: -0.85,
			steps: 5,
			colors: interpolateHSLA(
				HSLA([220, 80, 20, 1.0]),
				HSLA([210, 70, 30, 1.0]),
				5,
			),
		},
		{
			start: -0.85,
			end: -0.65,
			steps: 5,
			colors: interpolateHSLA(
				HSLA([210, 70, 30, 1.0]),
				HSLA([190, 50, 40, 1.0]),
				5,
			),
		},
		{
			start: -0.65,
			end: -0.45,
			steps: 5,
			colors: interpolateHSLA(
				HSLA([190, 50, 40, 1.0]),
				HSLA([40, 60, 65, 1.0]),
				5,
			),
		},
		{
			start: -0.45,
			end: -0.25,
			steps: 5,
			colors: interpolateHSLA(
				HSLA([40, 60, 65, 1.0]),
				HSLA([30, 50, 45, 1.0]),
				5,
			),
		},
		{
			start: -0.25,
			end: 0.0,
			steps: 5,
			colors: interpolateHSLA(
				HSLA([30, 50, 45, 1.0]),
				HSLA([20, 40, 35, 1.0]),
				5,
			),
		},
		{
			start: 0.0,
			end: 0.45,
			steps: 10,
			colors: interpolateHSLA(
				HSLA([20, 40, 35, 1.0]),
				HSLA([10, 30, 25, 1.0]),
				10,
			),
		},
		{
			start: 0.45,
			end: 0.85,
			steps: 25,
			colors: interpolateHSLA(
				HSLA([10, 30, 25, 1.0]),
				HSLA([5, 15, 40, 1.0]),
				25,
			),
		},
		{
			start: 0.85,
			end: 1.0,
			steps: 10,
			colors: interpolateHSLA(
				HSLA([5, 15, 65, 1.0]),
				HSLA([0, 0, 95, 1.0]),
				10,
			),
		},
	] as const;

	return terrainSections.flatMap((section) =>
		section.colors.map((color, index) => ({
			level: [
				section.start +
					(section.end - section.start) * (index / (section.steps - 1)),
				section.start +
					(section.end - section.start) * ((index + 1) / (section.steps - 1)),
			],
			color,
		})),
	);
})();
