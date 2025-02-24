import { GameConfig } from "~/app/derivean/GameConfig";

/**
 * Converts HSLA color values to RGBA
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 * @param a Alpha (0-1)
 * @returns RGBA array [r, g, b, a] where RGB and alpha are 0-255
 */
export const hslaToRgba = (
	h: number,
	s: number,
	l: number,
	a: number,
): [number, number, number, number] => {
	s /= 100;
	l /= 100;

	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = l - c / 2;
	let r = 0;
	let g = 0;
	let b = 0;

	if (h >= 0 && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (h >= 60 && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (h >= 120 && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (h >= 180 && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (h >= 240 && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (h >= 300 && h < 360) {
		r = c;
		g = 0;
		b = x;
	}

	return [
		Math.round((r + m) * 255),
		Math.round((g + m) * 255),
		Math.round((b + m) * 255),
		Math.round(a * 255),
	];
};

export namespace withColorMap {
	export interface Props {
		heightmap: number;
		biome: number;
		temperature: number;
		moisture: number;
		gameConfig: GameConfig;
		defaultColor?: [number, number, number, number];
	}
}

export const withColorMap = ({
	heightmap,
	biome,
	temperature,
	moisture,
	gameConfig,
	defaultColor = [0, 0, 100, 1],
}: withColorMap.Props) => {
	const heightmapColor = gameConfig.colorMap.heightmap.find(
		({ noise }) => heightmap >= noise,
	);
	const biomeColor = gameConfig.colorMap.biome.find(
		({ noise }) => biome >= noise,
	);
	const temperatureColor = gameConfig.colorMap.temperature.find(
		({ noise }) => temperature >= noise,
	);
	const moistureColor = gameConfig.colorMap.moisture.find(
		({ noise }) => moisture >= noise,
	);

	const [h, s, l, a] = heightmapColor?.color || defaultColor;

	return hslaToRgba(h, s, l, a);
};
