import { hslaToRgba } from "@use-pico/common";
import { GameConfig } from "~/app/derivean/GameConfig";

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

	const color = heightmapColor?.color || defaultColor;

	return hslaToRgba(color);
};
