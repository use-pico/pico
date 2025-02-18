export namespace withColorMap {
	export interface Level {
		level: number;
		color: string;
	}

	export interface Props {
		value: number;
		defaultColor?: string;
		levels: readonly Level[];
	}
}

export const withColorMap = ({
	value,
	defaultColor = "#ff0000",
	levels,
}: withColorMap.Props) => {
	const map = [...levels].sort((a, b) => b.level - a.level);

	return map.find(({ level }) => value >= level)?.color || defaultColor;
};
