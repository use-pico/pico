import { GameConfig } from "~/app/derivean/GameConfig";

export namespace withColorMap {
	export interface Props {
		value: number;
		gameConfig: GameConfig;
		defaultColor?: string;
	}
}

export const withColorMap = ({
	value,
	gameConfig,
	defaultColor = "#ff0000",
}: withColorMap.Props) => {
	return (
		gameConfig.colorMap.find(({ noise }) => value >= noise)?.color ||
		defaultColor
	);
};
