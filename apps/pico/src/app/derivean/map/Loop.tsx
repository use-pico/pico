import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, type FC } from "react";
import { MOUSE, TOUCH, type OrthographicCamera } from "three";
import { useDebouncedCallback } from "use-debounce";
import { GameConfig } from "~/app/derivean/GameConfig";
import type { GameEventBus } from "~/app/derivean/createGameEventBus";
import { ChunkManager } from "~/app/derivean/map/ChunkManager";

export namespace Loop {
	export interface Props {
		mapId: string;
		gameConfig: GameConfig;
		gameEventBus: GameEventBus;
		zoom: number;
	}
}

export const Loop: FC<Loop.Props> = ({
	mapId,
	gameConfig,
	gameEventBus,
	zoom,
}) => {
	console.log("Loop re-render");

	const camera = useThree(({ camera }) => camera) as OrthographicCamera;

	const onCamera = useDebouncedCallback(() => {
		gameEventBus.emit("onCamera", {
			x: camera.position.x,
			z: camera.position.z,
			bottom: camera.bottom,
			top: camera.top,
			left: camera.left,
			right: camera.right,
			zoom: camera.zoom,
		});
	}, 500);

	useEffect(() => {
		gameEventBus.emit("onCamera", {
			x: camera.position.x,
			z: camera.position.z,
			bottom: camera.bottom,
			top: camera.top,
			left: camera.left,
			right: camera.right,
			zoom: camera.zoom,
		});
	}, []);

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
				minZoom={gameConfig.minZoom}
				/**
				 * How close
				 */
				maxZoom={gameConfig.maxZoom}
				/**
				 * For my future me: this is used as a center point and must be set with
				 * camera coordinates else the view will break up.
				 */
				// target={target}
				mouseButtons={{ LEFT: MOUSE.PAN }}
				touches={{ ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_PAN }}
				makeDefault
				onEnd={onCamera}
			/>

			<ChunkManager
				mapId={mapId}
				gameConfig={gameConfig}
				gameEventBus={gameEventBus}
			/>
		</>
	);
};
