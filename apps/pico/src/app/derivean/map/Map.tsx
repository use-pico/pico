import { tvc } from "@use-pico/common";
import { FC } from "react";
import { Loop } from "~/app/derivean/map/Loop";
import { MapCanvas } from "~/app/derivean/map/MapCanvas";

export namespace Map {
	export interface Config {
		/**
		 * Number of plots in a chunk
		 */
		chunkSize: number;
		/**
		 * Size of a plot
		 */
		plotSize: number;
		plotCount: number;
	}

	export interface Props {
		mapId: string;
		config: Config;
	}
}

export const Map: FC<Map.Props> = ({ mapId, config }) => {
	return (
		<div className={tvc(["w-screen", "h-screen", "overflow-hidden"])}>
			<MapCanvas>
				<Loop
					mapId={mapId}
					config={config}
				/>
			</MapCanvas>
		</div>
	);
};
