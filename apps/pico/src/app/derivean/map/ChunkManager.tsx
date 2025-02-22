import { useCursor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Timer } from "@use-pico/common";
import { LRUCache } from "lru-cache";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { DataTexture, type OrthographicCamera } from "three";
import { pool } from "workerpool";
import { Game } from "~/app/derivean/Game";
import { useCamera } from "~/app/derivean/hook/useCamera";
import { Chunks } from "~/app/derivean/map/Chunks";
import { useVisibleChunks } from "~/app/derivean/map/hook/useVisibleChunks";
import { chunkIdOf } from "~/app/derivean/service/chunkIdOf";
import type { Chunk } from "~/app/derivean/type/Chunk";
import { generator } from "~/app/derivean/worker/generator";
import chunkOfUrl from "../worker/chunkOf?worker&url";

export namespace ChunkManager {
	export interface Level {
		/**
		 * Where to draw this layer (zoom)
		 */
		min: number;
		/**
		 * Where to stop drawing this layer (zoom)
		 */
		max: number;
		/**
		 * Scale of this layer (1 = 1x1, 2 = 2x2, 3 = 3:3)
		 */
		scale: number;
	}

	export interface Props {
		mapId: string;
		chunkSize: number;
		chunkLimit?: number;
		/**
		 * Level and scale of each level.
		 */
		levels: Level[];
	}
}

export const ChunkManager: FC<ChunkManager.Props> = ({
	mapId,
	chunkSize,
	chunkLimit = 1024,
	levels,
}) => {
	/**
	 * Chunk generator worker pool.
	 */
	const workerPool = useMemo(() => {
		return pool(chunkOfUrl, {
			workerOpts: {
				type: "module",
			},
		});
	}, []);

	const camera = useThree(({ camera }) => camera);
	const [level, setLevel] = useState<ChunkManager.Level>(
		levels.find(
			(level) => camera.zoom >= level.min && camera.zoom <= level.max,
		) || { min: 0, max: 0, scale: 1 },
	);
	const visibleChunks = useVisibleChunks({
		offset: 0,
	});
	/**
	 * Current chunk hash; when updated, triggers chunk re-render.
	 *
	 * Works with chunkCache in cooperation; chunkCache is a stable reference, so
	 * this values is needed to trigger re-render of chunks.
	 */
	const [hash, setHash] = useState<string | undefined>(undefined);
	const [currentHash, setCurrentHash] = useState<Chunk.Hash>(
		visibleChunks({ chunkSize: chunkSize * level.scale }),
	);
	/**
	 * List of requested chunk hashes to prevent multiple generator requests.
	 *
	 * This is used internally by update method, so it won't trigger more generator requests.
	 */
	const requests = useRef<Chunk.Hash[]>([]);
	const abort = useRef(new AbortController());

	const isLoading = useRef(false);

	/**
	 * Chunk LRU cache which controls, how many of them are available to the user.
	 */
	const chunkCache = useMemo(() => {
		return new LRUCache<string, Chunk.Texture>({
			max: chunkLimit,
			ttl: 0,
		});
	}, []);

	useCamera<OrthographicCamera>({
		callback(camera) {
			const currentLevel: ChunkManager.Level = levels.find(
				(level) => camera.zoom >= level.min && camera.zoom <= level.max,
			) || { min: 0, max: 0, scale: 1 };
			setLevel(currentLevel);

			console.log("zoom", camera.zoom);

			const chunkHash = visibleChunks({
				chunkSize: chunkSize * currentLevel.scale,
			});
			setCurrentHash(chunkHash);

			/**
			 * Refresh chunks in the current view.
			 */
			chunkIdOf(chunkHash).forEach(({ id }) => {
				chunkCache.get(id);
			});

			if (!requests.current.includes(chunkHash)) {
				requests.current.push(chunkHash);

				const timer = new Timer();
				timer.start();
				console.info(
					`[Chunks] Requesting chunks [${chunkHash.count}] ${chunkHash.hash}; scale ${currentLevel.scale}`,
				);

				abort.current.abort(
					`New generator request [${chunkHash.hash}]; scale ${currentLevel.scale}`,
				);

				isLoading.current = true;

				generator({
					pool: workerPool,
					mapId,
					seed: mapId,
					hash: chunkHash,
					level: currentLevel.scale,
					skip: [...chunkCache.keys()],
					abort: (abort.current = new AbortController()),
					onComplete(chunks) {
						isLoading.current = false;
						requests.current = [];

						performance.mark("generator-onComplete-start");

						for (const { tiles: _, ...chunk } of chunks) {
							const texture = new DataTexture(
								new Uint8Array(chunk.texture.data),
								chunk.texture.size,
								chunk.texture.size,
							);
							texture.needsUpdate = true;

							chunkCache.set(chunk.id, {
								chunk,
								texture,
							});
						}

						performance.mark("generator-onComplete-end");
						performance.measure(
							"generator-onComplete",
							"generator-onComplete-start",
							"generator-onComplete-end",
						);

						/**
						 * This triggers re-render of chunks
						 */
						setHash(chunkHash.hash);
					},
				});
			}
		},
	});

	useEffect(() => {
		return () => {
			chunkCache.clear();
			abort.current.abort("Unmounted");
			workerPool.terminate();
		};
	}, []);

	useCursor(isLoading.current, "wait", "auto");

	return (
		<Chunks
			chunkSize={chunkSize * level.scale}
			plotSize={Game.plotSize}
			offset={level.scale > 1 ? chunkSize * 0.5 : 0}
			chunks={chunkCache}
			hash={hash}
			currentHash={currentHash}
		/>
	);
};
