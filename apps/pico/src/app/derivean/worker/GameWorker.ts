import { Timer } from "@use-pico/common";
import { expose } from "comlink";
import { file, write } from "opfs-tools";
import { Game } from "~/app/derivean/Game";
import { withLandNoise } from "~/app/derivean/map/noise/withLandNoise";
import { compressChunk } from "~/app/derivean/service/compressChunk";
import { withGenerator } from "~/app/derivean/service/generator/withGenerator";
import type { ChunkHash } from "~/app/derivean/type/ChunkHash";

export namespace generator {
	export interface Props {
		mapId: string;
		seed: string;
		hash: ChunkHash;
		/**
		 * List of chunk IDs to skip (e.g. they're still visible)
		 */
		skip: string[];
	}
}

const generator = async ({ mapId, seed, hash, skip }: generator.Props) => {
	const timer = new Timer();
	timer.start();

	console.log(
		`[Worker] Started generator for [${hash.count} chunks] ${hash.hash}`,
	);

	if (hash.count >= 256) {
		throw new Error(`\t- Too much chunks ${hash.count} of 256`);
	}

	const chunkHits = new Int32Array(new SharedArrayBuffer(4));

	const generator = withGenerator({
		plotCount: Game.plotCount,
		seed,
		scale: 1,
		noise: ({ seed }) => ({
			land: withLandNoise({ seed }),
		}),
		tile: {
			id: "grass",
			chance: 100,
			color: "#00FF00",
			noise: 1,
		},
	});

	return Promise.all(
		Array.from({ length: hash.maxX - hash.minX }, (_, i) =>
			Array.from({ length: hash.maxZ - hash.minZ }, async (_, j) => {
				const x = hash.minX + i;
				const z = hash.minZ + j;

				const chunkId = `${x}:${z}`;
				const chunkFile = `/chunk/${mapId}/${chunkId}.bin`;

				if (skip.includes(chunkId)) {
					return undefined;
				}

				if (await file(chunkFile).exists()) {
					Atomics.add(chunkHits, 0, 1);
				} else {
					await write(chunkFile, compressChunk(generator({ x, z })));
				}

				return new Uint8Array(await file(chunkFile).arrayBuffer());
			}),
		).flat(),
	).then((data) => {
		const chunks = data.filter((chunk) => Boolean(chunk)) as Uint8Array[];

		console.log(
			`[Worker]\t- Finished [chunk hits ${((100 * Atomics.load(chunkHits, 0)) / chunks.length).toFixed(0)}%; generated ${((100 * chunks.length) / data.length).toFixed(0)}%] [${timer.format()}]`,
		);

		return chunks;
	});
};

export interface GameWorker {
	generator: typeof generator;
}

expose({
	generator,
});
