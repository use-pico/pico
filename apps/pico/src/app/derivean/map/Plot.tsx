import { tvc } from "@use-pico/common";
import { memo, type FC } from "react";
import { Game } from "~/app/derivean/Game";

export namespace Plot {
	export interface Plot {
		id: string;
	}
	export interface Props {
		mapId: string;
		plot: Plot;
	}
}

export const Plot: FC<Plot.Props> = memo(({ mapId, plot }) => {
	return (
		<div
			className={tvc([
				"rounded-md",
				"p-2",
				"cursor-pointer",
				"hover:text-purple-500",
				"hover:border",
				"hover:bg-purple-50",
				"hover:border-purple-400",
				"hover:opacity-50",
				"flex",
				"flex-row",
				"items-center",
				"justify-center",
			])}
			style={{
				width: Game.plot.size,
				height: Game.plot.size,
			}}
		/>
	);
});
