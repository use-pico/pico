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
	}
}

export const generator = async ({
	pool,
	mapId,
	seed,
	hash,
	skip,
}: generator.Props) => {
	const timer = new Timer();
	timer.start();

	console.log(
		`[Worker] Started generator for [${hash.count} chunks] ${hash.hash}`,
	);

	return Promise.all(
		chunkIdOf(hash).map(({ id, z, x }) => {
			if (skip.includes(id)) {
				return undefined;
			}

			return pool.exec("chunkOf", [
				{
					seed,
					mapId,
					plotCount: Game.plotCount,
					x,
					z,
				} satisfies chunkOf.Props,
			]);
		}),
	).then((data) => {
		const chunks = data.filter((chunk) => Boolean(chunk)) as Chunk[];

		console.log(
			`[Worker]\t- Finished [generated ${((100 * chunks.length) / data.length).toFixed(0)}%] [${timer.format()}]`,
		);

		return chunks;
	});
};

export interface GameWorker {
	generator: typeof generator;
}
