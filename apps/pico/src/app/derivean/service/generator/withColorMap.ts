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
	defaultColor = [255, 0, 0, 255],
}: withColorMap.Props) => {
	return (
		gameConfig.colorMap.heightmap.find(({ noise }) => heightmap >= noise)
			?.color || defaultColor
	);
};
