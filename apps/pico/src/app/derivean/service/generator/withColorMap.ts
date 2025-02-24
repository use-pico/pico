import { GameConfig } from "~/app/derivean/GameConfig";

export namespace withColorMap {
	export interface Props {
		value: number;
		gameConfig: GameConfig;
		defaultColor?: [number, number, number, number];
	}
}

export const withColorMap = ({
	value,
	gameConfig,
	defaultColor = [255, 0, 0, 255],
}: withColorMap.Props) => {
	return (
		gameConfig.colorMap.find(({ noise }) => value >= noise)?.color ||
		defaultColor
	);
};
