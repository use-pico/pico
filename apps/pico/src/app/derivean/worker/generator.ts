import { Timer } from "@use-pico/common";
import pMap from "p-map";
import { type Pool } from "workerpool";
import { Game } from "~/app/derivean/Game";
import { chunkIdOf } from "~/app/derivean/service/chunkIdOf";
import type { Chunk } from "~/app/derivean/type/Chunk";
import { chunkOf } from "~/app/derivean/worker/chunkOf";

export namespace generator {
	export interface Props {
		pool: Pool;
		mapId: string;
		seed: string;
		hash: Chunk.Hash;
		/**
		 * List of chunk IDs to skip (e.g. they're still visible)
		 */
		skip: string[];
		concurrency?: number;
		/**
		 * Called when a chunk arrives
		 */
		onChunk?(awaitChunk: Promise<Chunk>): Promise<any>;
		onComplete?(chunks: Chunk[]): void;
		abort?: AbortController;
	}
}

export const generator = async ({
	pool,
	mapId,
	seed,
	hash,
	skip,
	concurrency = 6,
	onChunk,
	onComplete,
	abort: { signal } = new AbortController(),
}: generator.Props) => {
	const timer = new Timer();
	timer.start();

	console.info(
		`\t[generator] Started generator for [${hash.count} chunks] ${hash.hash}`,
	);

	return pMap(
		chunkIdOf(hash).filter(({ id }) => !skip.includes(id)),
		async ({ z, x }) => {
			const promise = pool.exec("chunkOf", [
				{
					seed,
					mapId,
					plotCount: Game.plotCount,
					x,
					z,
				} satisfies chunkOf.Props,
			]) as unknown as Promise<Chunk>;

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
				`\t[generator]\t- Finished [generated ${((100 * data.length) / hash.count).toFixed(0)}%] [${timer.format()}]`,
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
