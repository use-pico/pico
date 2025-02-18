import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { MOUSE, Vector3, type DirectionalLight } from "three";
import { useDebouncedCallback } from "use-debounce";
import { Chunks } from "~/app/derivean/map/Chunks";
import { useVisibleChunks } from "~/app/derivean/map/hook/useVisibleChunks";
import { GameWorkerLoader } from "~/app/derivean/worker/GameWorkerLoader";

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

	export namespace OnCamera {
		export interface Props {
			x: number;
			z: number;
			zoom: number;
		}

		export type Callback = (props: Props) => void;
	}

	export interface Props {
		mapId: string;
		config: Config;
		pos: { x: number; z: number };
		zoom: number;
		onCamera?: OnCamera.Callback;
	}
}

export const Loop: FC<Loop.Props> = ({
	mapId,
	config,
	pos,
	zoom,
	onCamera,
}) => {
	const { camera } = useThree(({ camera }) => ({
		camera,
	}));
	const visibleChunks = useVisibleChunks({ chunkSize: config.chunkSize });

	const [hash, setHash] = useState<string | undefined>();
	const lightRef = useRef<DirectionalLight>(null);

	const chunks = useQuery({
		queryKey: ["chunks", mapId, hash],
		queryFn: async () => {
			if (!hash) {
				return [];
			}
			/**
			 * Maybe a duplicate call, but is fast enough to not concern about it.
			 */
			const { minX, maxX, minZ, maxZ, count, hash: $hash } = visibleChunks();

			/**
			 * TODO Add Chunk component here?
			 */

			return GameWorkerLoader.chunks(
				mapId,
				mapId,
				minX,
				maxX,
				minZ,
				maxZ,
				count,
				$hash,
			);
		},
		staleTime: 0,
		gcTime: 0,
		refetchOnWindowFocus: false,
	});

	const update = useDebouncedCallback(async () => {
		if (lightRef.current) {
			lightRef.current.position.set(
				camera.position.x - 256,
				256,
				camera.position.z - 256,
			);
			lightRef.current.target.position.set(
				camera.position.x,
				0,
				camera.position.z,
			);
			lightRef.current.target.updateMatrixWorld();
		}

		onCamera?.({
			x: camera.position.x,
			z: camera.position.z,
			zoom: camera.zoom,
		});

		const { hash: $hash } = visibleChunks();

		if ($hash === hash) {
			return;
		}

		setHash($hash);
	}, 50);

	useEffect(() => {
		update();
	}, []);

	const render = useMemo(() => {
		return hash ?
				<Chunks
					mapId={mapId}
					config={config}
					chunks={chunks.data ?? []}
					hash={hash}
				/>
			:	null;
	}, [chunks.data]);

	return (
		<>
			<directionalLight
				ref={lightRef}
				castShadow
				color={0xffffff}
				intensity={4}
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
				// minZoom={1.5}
				/**
				 * How close
				 */
				// maxZoom={32}
				target={new Vector3(pos.x, 0, pos.z)}
				mouseButtons={{ LEFT: MOUSE.PAN }}
				onChange={update}
				makeDefault
			/>

			{render}
		</>
	);
};
