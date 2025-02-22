import { Timer } from "@use-pico/common";
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
		/**
		 * Called when a chunk arrives
		 */
		onChunk?(awaitChunk: Promise<Chunk>): Promise<any>;
		onComplete?(chunks: Chunk[]): void;
	}
}

export const generator = async ({
	pool,
	mapId,
	seed,
	hash,
	skip,
	onChunk,
	onComplete,
}: generator.Props) => {
	const timer = new Timer();
	timer.start();

	console.log(
		`[Worker] Started generator for [${hash.count} chunks] ${hash.hash}`,
	);

	return Promise.all(
		chunkIdOf(hash)
			.filter(({ id }) => !skip.includes(id))
			.map(async ({ z, x }) => {
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
			}),
	).then((data) => {
		onComplete?.(data);

		console.log(
			`[Worker]\t- Finished [generated ${((100 * data.length) / hash.count).toFixed(0)}%] [${timer.format()}]`,
		);

		return data;
	});
};

export interface GameWorker {
	generator: typeof generator;
}
