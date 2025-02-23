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
		onChunk?(awaitChunk: Promise<chunkOf.Result>): Promise<any>;
		onComplete?(chunks: chunkOf.Result[]): void;
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
			]) as unknown as Promise<chunkOf.Result>;

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
				`\t[generator]\t- Finished [cache hit ${data.length > 0 ? ((100 * data.filter((chunk) => chunk.hit).length) / level.count).toFixed(0) : "100"}%; generated ${((100 * data.length) / level.count).toFixed(0)}%] [${timer.format()}]`,
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
