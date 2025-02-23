import { useEvent } from "@use-pico/client";
import { Timer } from "@use-pico/common";
import { LRUCache } from "lru-cache";
import { useMemo, useRef, useState, type FC } from "react";
import { DataTexture } from "three";
import { pool } from "workerpool";
import { GameConfig } from "~/app/derivean/GameConfig";
import type { GameEventBus } from "~/app/derivean/createGameEventBus";
import { Chunks } from "~/app/derivean/map/Chunks";
import { useVisibleChunks } from "~/app/derivean/map/hook/useVisibleChunks";
import { chunkIdOf } from "~/app/derivean/service/chunkIdOf";
import type { Chunk } from "~/app/derivean/type/Chunk";
import { generator } from "~/app/derivean/worker/generator";
import chunkOfUrl from "../worker/chunkOf?worker&url";

export namespace ChunkManager {
	export interface Props {
		mapId: string;
		gameConfig: GameConfig;
		gameEventBus: GameEventBus;
	}
}

export const ChunkManager: FC<ChunkManager.Props> = ({
	mapId,
	gameConfig,
	gameEventBus,
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

	/**
	 * Chunk LRU cache which controls, how many of them are available to the user.
	 */
	const chunkCache = useMemo(() => {
		const map = new Map<Chunk.Level, LRUCache<string, Chunk.Runtime>>();
		gameConfig.layers.forEach((layer) => {
			map.set(
				layer.level,
				new LRUCache<string, Chunk.Runtime>({
					max: gameConfig.chunkLimit,
					ttl: 0,
				}),
			);
		});
		return map;
	}, []);
	const [levels, setLevels] = useState<Chunk.View.Level[]>([]);
	const abort = useRef(new AbortController());

	const visibleChunks = useVisibleChunks({
		gameConfig,
	});

	useEvent({
		eventBus: gameEventBus,
		event: "onCamera",
		callback(props) {
			const { levels } = visibleChunks(props);

			Promise.all<Chunk.View.Level>(
				levels.map(
					(level) =>
						new Promise<Chunk.View.Level>((resolve) => {
							console.info("[ChunkManager]\tProcessing level", level);

							const cache = chunkCache.get(level.level);
							if (!cache) {
								console.warn(
									`[ChunkManager]\t\tChunk cache for level ${level.level} not found; that's quite strange. Doctor Strange.`,
								);
								throw new Error("Chunk cache not found");
							}

							/**
							 * Refresh chunks in the current view.
							 */
							chunkIdOf(level).forEach(({ id }) => {
								cache.get(id);
							});

							const timer = new Timer();
							timer.start();
							console.info(
								`[ChunkManager]\tRequesting chunks [${level.count}] ${level.hash}`,
							);

							generator({
								pool: workerPool,
								mapId,
								gameConfig,
								level,
								skip: [...cache.keys()],
								abort: (abort.current = new AbortController()),
								onComplete(chunks) {
									// requests.current = [];

									for (const { texture, ...chunk } of chunks) {
										const txt = new DataTexture(
											new Uint8Array(texture.data),
											texture.size,
											texture.size,
										);
										txt.needsUpdate = true;

										cache.set(chunk.id, {
											...chunk,
											texture: {
												size: texture.size,
												data: txt,
											},
										});
									}

									resolve(level);
								},
							});
						}),
				),
			).then(setLevels);
		},
	});

	// useCursor(isLoading.current, "wait", "auto");

	const chunks = useMemo(() => {
		return levels.map((level) => {
			const cache = chunkCache.get(level.level);
			if (!cache) {
				return null;
			}

			return (
				<Chunks
					key={`chunks-${level.level}`}
					chunks={cache}
				/>
			);
		});
	}, [levels]);

	return (
		<>
			<mesh position={[gameConfig.plotSize / 2, 0, gameConfig.plotSize / 2]}>
				<boxGeometry args={[gameConfig.plotSize, 1, gameConfig.plotSize]} />
			</mesh>

			{chunks}
		</>
	);
};
