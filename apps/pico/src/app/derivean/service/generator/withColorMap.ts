import { hslaToRgba } from "@use-pico/common";
import { GameConfig } from "~/app/derivean/GameConfig";

export function grayscaleFromNoise(
	noise: number,
): [number, number, number, number] {
	// 1. Clamp the noise to the range [-1, 1]
	const clamped = Math.max(-1, Math.min(1, noise));

	// 2. Map from [-1, 1] to [0, 255]
	//    -1 -> 0, 1 -> 255
	const gray = Math.floor(((clamped + 1) / 2) * 255);

	// 3. Return as [R, G, B, A] with full opacity
	return [gray, gray, gray, 255];
}

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
	const heightmapStop = gameConfig.colorMap.heightmap.find(
		({ noise }) => heightmap >= noise,
	);

	const biomeStop = gameConfig.colorMap.biome.find(
		({ noise }) => biome >= noise,
	);
	const temperatureStop = gameConfig.colorMap.temperature.find(
		({ noise }) => temperature >= noise,
	);
	const moistureStop = gameConfig.colorMap.moisture.find(
		({ noise }) => moisture >= noise,
	);

	const baseColor = heightmapStop?.color || defaultColor;
	const biomeMod = biomeStop?.color || [0, 0, 0, 0];
	const temperatureMod = temperatureStop?.color || [0, 0, 0, 0];
	const moistureMod = moistureStop?.color || [0, 0, 0, 0];

	// return grayscaleFromNoise(biome);

	return hslaToRgba([
		Math.max(
			0,
			Math.min(
				360,
				baseColor[0] + biomeMod[0] + temperatureMod[0] + moistureMod[0],
			),
		),
		Math.max(
			0,
			Math.min(
				100,
				baseColor[1] + biomeMod[1] + temperatureMod[1] + moistureMod[1],
			),
		),
		Math.max(
			0,
			Math.min(
				100,
				baseColor[2] + biomeMod[2] + temperatureMod[2] + moistureMod[2],
			),
		),
		Math.max(
			0,
			Math.min(
				1,
				baseColor[3] + biomeMod[3] + temperatureMod[3] + moistureMod[3],
			),
		),
	]);
};
