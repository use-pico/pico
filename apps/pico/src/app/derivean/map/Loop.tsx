import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Timer } from "@use-pico/common";
import { LRUCache } from "lru-cache";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { DataTexture, MOUSE, type DirectionalLight } from "three";
import { useDebouncedCallback } from "use-debounce";
import { pool } from "workerpool";
import { Chunks } from "~/app/derivean/map/Chunks";
import { useVisibleChunks } from "~/app/derivean/map/hook/useVisibleChunks";
import { chunkIdOf } from "~/app/derivean/service/chunkIdOf";
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
	/**
	 * Chunk generator worker pool.
	 */
	const workerPool = useMemo(() => {
		return pool(new URL("../worker/chunkOf.js", import.meta.url).href, {
			workerOpts: {
				type: "module",
			},
		});
	}, []);
	/**
	 * Chunk LRU cache which controls, how many of them are available to the user.
	 */
	const chunkCache = useMemo(() => {
		return new LRUCache<string, Chunk.Texture>({
			max: limit,
			ttl: 0,
		});
	}, []);

	/**
	 * Current chunk hash; when updated, triggers chunk re-render.
	 *
	 * Works with chunkCache in cooperation; chunkCache is a stable reference, so
	 * this values is needed to trigger re-render of chunks.
	 */
	const [hash, setHash] = useState<string | undefined>(undefined);
	/**
	 * List of requested chunk hashes to prevent multiple generator requests.
	 *
	 * This is used internally by update method, so it won't trigger more generator requests.
	 */
	const requests = useRef<Chunk.Hash[]>([]);

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

		/**
		 * Refresh chunks in the current view.
		 */
		chunkIdOf(chunkHash).forEach(({ id }) => {
			chunkCache.get(id);
		});

		if (requests.current.includes(chunkHash)) {
			return;
		}

		requests.current.push(chunkHash);

		const timer = new Timer();
		timer.start();
		console.log(
			`[Chunks] Requesting chunks [${chunkHash.count}] ${chunkHash.hash}`,
		);

		workerPool.terminate(true).then(() => {
			generator({
				pool: workerPool,
				mapId,
				seed: mapId,
				hash: chunkHash,
				skip: [...chunkCache.keys()],
				async onChunk(awaitChunk) {
					const { tiles: _, ...$chunk } = await awaitChunk;

					const texture = new DataTexture(
						new Uint8Array($chunk.texture.data),
						$chunk.texture.size,
						$chunk.texture.size,
					);
					texture.needsUpdate = true;

					chunkCache.set($chunk.id, {
						chunk: $chunk,
						texture,
					});
				},
				onComplete() {
					requests.current = [];
					/**
					 * This triggers re-render of chunks
					 */
					setHash(chunkHash.hash);
				},
			});
		});
	}, 1000);

	useEffect(() => {
		update();

		return () => {
			chunkCache.clear();
			workerPool.terminate();
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
				minZoom={0.025}
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
				chunks={chunkCache}
				hash={hash}
			/>
		</>
	);
};
