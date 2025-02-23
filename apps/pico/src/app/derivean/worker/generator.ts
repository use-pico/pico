import { Timer } from "@use-pico/common";
import pMap from "p-map";
import { type Pool } from "workerpool";
import { GameConfig } from "~/app/derivean/GameConfig";
import { chunkIdOf } from "~/app/derivean/service/chunkIdOf";
import type { Chunk } from "~/app/derivean/type/Chunk";
import { chunkOf } from "~/app/derivean/worker/chunkOf";

export namespace generator {
	export interface Props {
		pool: Pool;
		mapId: string;
		gameConfig: GameConfig;
		level: Chunk.View.Level;
		/**
		 * List of chunk IDs to skip (e.g. they're still visible)
		 */
		skip: string[];
		concurrency?: number;
		/**
		 * Called when a chunk arrives
		 */
		onChunk?(awaitChunk: Promise<Chunk.Data>): Promise<any>;
		onComplete?(chunks: Chunk.Data[]): void;
		abort?: AbortController;
	}
}

export const generator = async ({
	pool,
	mapId,
	gameConfig,
	level,
	skip,
	concurrency = Infinity,
	onChunk,
	onComplete,
	abort: { signal } = new AbortController(),
}: generator.Props) => {
	const timer = new Timer();
	timer.start();

	console.info(
		`\t[generator] Started generator for [${level.count} chunks] ${level.hash}`,
	);

	return pMap(
		chunkIdOf(level).filter(({ id }) => !skip.includes(id)),
		async ({ z, x, id }) => {
			const promise = pool.exec("chunkOf", [
				{
					id,
					mapId,
					gameConfig,
					level,
					x,
					z,
				} satisfies chunkOf.Props,
			]) as unknown as Promise<Chunk.Data>;

			onChunk?.(promise);

			return promise;
		},
		{
			concurrency,
			stopOnError: false,
			signal,
		},
	)
		.then((data) => {
			onComplete?.(data);

			console.info(
				`\t[generator]\t- Finished [generated ${((100 * data.length) / level.count).toFixed(0)}%] [${timer.format()}]`,
			);

			return data;
		})
		.catch((e) => {
			console.warn(e);
		});
};

export interface GameWorker {
	generator: typeof generator;
}
