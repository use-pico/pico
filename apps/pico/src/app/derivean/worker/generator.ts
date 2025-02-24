import { Timer, toHumanNumber } from "@use-pico/common";
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
			const hit = data.filter((chunk) => chunk.hit).length;

			console.info(
				`\t[generator]\tFinished ${toHumanNumber({ number: timer.ms() })}ms
\t\tRequested ${level.count}, cached ${hit}, generated ${data.length - hit}, skips ${skip.length}
\t\tcache hit ${data.length > 0 ? `${((100 * hit) / level.count).toFixed(0)}%` : "100% (external cache)"}
\t\tgenerated ${((100 * data.length) / level.count).toFixed(0)}%`,
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
