import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Timer } from "@use-pico/common";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { DataTexture, MOUSE, type DirectionalLight } from "three";
import { useDebouncedCallback } from "use-debounce";
import { pool } from "workerpool";
import { Chunks } from "~/app/derivean/map/Chunks";
import { useVisibleChunks } from "~/app/derivean/map/hook/useVisibleChunks";
import type { Chunk } from "~/app/derivean/type/Chunk";
import { generator } from "~/app/derivean/worker/generator";

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
		zoom: number;
		limit?: number;
		offset?: number;
		onCamera?: OnCamera.Callback;
	}
}

export const Loop: FC<Loop.Props> = ({
	mapId,
	config,
	zoom,
	offset = 2,
	limit = 1024,
	onCamera,
}) => {
	const { camera } = useThree(({ camera }) => ({
		camera,
	}));
	const jobs = useMemo(() => {
		return pool(new URL("../worker/chunkOf.js", import.meta.url).href, {
			workerOpts: {
				type: "module",
			},
		});
	}, []);
	const [chunks, setChunks] = useState<Map<string, Chunk.Texture>>(new Map());
	const [hash, setHash] = useState<Chunk.Hash | undefined>(undefined);
	const visibleChunks = useVisibleChunks({
		chunkSize: config.chunkSize,
		offset,
	});

	const lightRef = useRef<DirectionalLight>(null);

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

		const chunkHash = visibleChunks();

		if (chunkHash.hash === hash?.hash) {
			return;
		}

		const timer = new Timer();
		timer.start();
		console.log(
			`[Chunks] Requesting chunks [${chunkHash.count}] ${chunkHash.hash}`,
		);

		setHash(chunkHash);

		jobs.terminate(true).then(() => {
			generator({
				pool: jobs,
				mapId,
				seed: mapId,
				hash: chunkHash,
				skip: [...chunks.keys()],
			}).then((chunks) => {
				console.log(`[Chunks] - Received chunks ${timer.format()}`);

				const chunkTimer = new Timer();
				chunkTimer.start();

				setChunks((prev) => {
					const next = new Map(
						Array.from(prev.values())
							.slice(-Math.abs(limit))
							.concat(
								chunks.map((chunk) => {
									const { tiles: _, ...$chunk } = chunk;

									const texture = new DataTexture(
										new Uint8Array($chunk.texture.data),
										$chunk.texture.size,
										$chunk.texture.size,
									);
									texture.needsUpdate = true;

									return {
										chunk: $chunk,
										texture,
									};
								}),
							)
							.map((chunk) => [chunk.chunk.id, chunk]),
					);
					console.log(
						`[Chunks] - done ${timer.format()}; chunk processing ${chunkTimer.format()}`,
					);
					return next;
				});
			});
		});
	}, 1000);

	useEffect(() => {
		update();

		return () => {
			jobs.terminate();
		};
	}, []);

	return (
		<>
			<directionalLight
				ref={lightRef}
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
				minZoom={0.05}
				/**
				 * How close
				 */
				maxZoom={1}
				// target={new Vector3(pos.x, 0, pos.z)}
				mouseButtons={{ LEFT: MOUSE.PAN }}
				onEnd={update}
				makeDefault
			/>

			<Chunks
				config={config}
				chunks={chunks}
			/>
		</>
	);
};
