import { OrbitControls } from "@react-three/drei";
import { type FC } from "react";
import { MOUSE, TOUCH } from "three";
import { ChunkManager } from "~/app/derivean/map/ChunkManager";

export namespace Loop {
	export interface Config {
		/**
		 * Number of plots in a chunk
		 */
		chunkSize: number;
		plotCount: number;
		/**
		 * Size of a plot
		 */
		plotSize: number;
	}

	export interface Props {
		mapId: string;
		config: Config;
		zoom: number;
	}
}

export const Loop: FC<Loop.Props> = ({ mapId, config, zoom }) => {
	return (
		<>
			<directionalLight
				castShadow
				color={0xffffff}
				intensity={2.5}
				position={[0, 256, 256]}
				shadow-mapSize={[4096, 4096]}
				shadow-bias={-0.0001}
				shadow-normalBias={0.1}
				shadow-radius={15}
			/>

			<OrbitControls
				enableRotate={false}
				enablePan={true}
				enableZoom={true}
				enableDamping={true}
				screenSpacePanning={true}
				zoomToCursor
				zoom0={zoom}
				/**
				 * How far
				 */
				minZoom={0.005}
				/**
				 * How close
				 */
				maxZoom={1}
				/**
				 * For my future me: this is used as a center point and must be set with
				 * camera coordinates else the view will break up.
				 */
				// target={target}
				mouseButtons={{ LEFT: MOUSE.PAN }}
				touches={{ ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_PAN }}
				makeDefault
			/>

			<ChunkManager
				mapId={mapId}
				chunkSize={config.chunkSize}
				chunkLimit={1024}
				levels={[
					{
						min: 0.065,
						max: 1,
						scale: 1,
					},
					{
						min: 0.035,
						max: 0.065,
						scale: 2,
					},
					{
						min: 0.01,
						max: 0.035,
						scale: 4,
					},
					{
						min: 0.005,
						max: 0.01,
						scale: 16,
					},
				]}
			/>
		</>
	);
};
