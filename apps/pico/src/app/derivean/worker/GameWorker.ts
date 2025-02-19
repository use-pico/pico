import { hexToRGB, Timer } from "@use-pico/common";
import { deserialize, serialize } from "borsh";
import { expose, transfer } from "comlink";
import { decompressSync, deflateSync } from "fflate";
import { dir, file, write } from "opfs-tools";
import { Game } from "~/app/derivean/Game";
import { withLandNoise } from "~/app/derivean/map/noise/withLandNoise";
import { ChunkBorshSchema } from "~/app/derivean/service/generator/ChunkBorshSchema";
import { withColorMap } from "~/app/derivean/service/generator/withColorMap";
import { withGenerator } from "~/app/derivean/service/generator/withGenerator";
import type { Texture } from "~/app/derivean/Texture";
import type { Chunk } from "~/app/derivean/type/Chunk";
import type { ChunkHash } from "~/app/derivean/type/ChunkHash";

/**
 * Complicated, because of async functions.
 */
const chunkHits = new Int32Array(new SharedArrayBuffer(4));
let chunksAbortController = new AbortController();

const cancelChunks = () => {
	console.log("Canceling chunks");
	chunksAbortController.abort();
};

export namespace chunks {
	export interface Props {
		mapId: string;
		seed: string;
		hash: ChunkHash;
	}
}

const chunks = async ({
	mapId,
	seed,
	hash: { minX, maxX, minZ, maxZ, count, hash },
}: chunks.Props) => {
	const timer = new Timer();
	timer.start();

	chunksAbortController = new AbortController();

	console.log(`Generating ${count} chunks, ${hash}`);

	Atomics.store(chunkHits, 0, 0);

	const generator = withGenerator({
		plotCount: Game.plotCount,
		plotSize: Game.plotSize,
		seed,
		scale: 1,
		noise({ seed }) {
			return {
				land: withLandNoise({ seed }),
			};
		},
		tile: {
			id: "grass",
			chance: 100,
			color: "#00FF00",
			noise: 1,
		},
		layers() {
			return [];
		},
	});

	await dir(`/chunk/${mapId}`).create();

	const chunks = new Array<Promise<Chunk>>(count);

	try {
		let index = 0;
		for (let x = minX; x < maxX; x++) {
			for (let z = minZ; z < maxZ; z++) {
				if (chunksAbortController.signal.aborted) {
					console.warn("\t - Chunks aborted");
					chunksAbortController = new AbortController();
					return [];
				}

				chunks[index++] = (async (): Promise<Chunk> => {
					const chunkId = `${x}:${z}`;
					const chunkFile = `/chunk/${mapId}/${chunkId}.borsh`;

					/**
					 * File reading does not throw an error, so it's necessary to check
					 * for existence.
					 */
					if (await file(chunkFile).exists()) {
						const data = deserialize(
							ChunkBorshSchema,
							decompressSync(
								new Uint8Array(await file(chunkFile).arrayBuffer()),
							),
						) as Chunk;

						Atomics.add(chunkHits, 0, 1);

						return data;
					}

					const data = {
						id: chunkId,
						x,
						z,
						tiles: generator({ x, z }),
					} as const;

					write(
						chunkFile,
						deflateSync(serialize(ChunkBorshSchema, data), { level: 9 }),
					);

					return data;
				})();
			}
		}
	} catch (e) {
		console.error(e);
		throw e;
	}

	return Promise.all<Chunk>(chunks)
		.catch((e) => {
			console.error(e);
		})
		.then((data) => {
			console.log(
				`\t- Chunks finished [cache ${((100 * Atomics.load(chunkHits, 0)) / chunks.length).toFixed(0)}%] [${timer.format()}]`,
			);
			return data as Chunk[];
		});
};

const textureHits = new Int32Array(new SharedArrayBuffer(4));
let texturesAbortController = new AbortController();

const cancelTextures = () => {
	console.log("Canceling textures");
	texturesAbortController.abort();
};

export namespace textures {
	export interface Props {
		mapId: string;
		chunks: Chunk[];
		hash: ChunkHash;
		size: number;
		colorMap: readonly { color: string }[];
	}
}

const textures = async ({
	mapId,
	chunks,
	hash: { hash },
	size,
	colorMap,
}: textures.Props) => {
	const timer = new Timer();
	timer.start();

	texturesAbortController = new AbortController();

	console.log(`Generating ${chunks.length} textures, ${hash}`);

	await dir(`/texture/${mapId}`).create();

	const textures: Record<string, Texture> = {};
	const transfers: ArrayBufferLike[] = [];
	const colorBuffers = new Map<string, Uint8Array>();

	const plot = 1;

	Atomics.store(textureHits, 0, 0);

	for (const { color } of colorMap.values()) {
		const { r, g, b } = hexToRGB(color);

		const length = plot * 3;
		const buffer = new Uint8Array(length);
		for (let i = 0; i < length; i += 3) {
			buffer[i] = r;
			buffer[i + 1] = g;
			buffer[i + 2] = b;
		}
		colorBuffers.set(color, buffer);
	}

	for (const chunk of chunks) {
		if (texturesAbortController.signal.aborted) {
			console.warn("\t - Textures aborted");
			texturesAbortController = new AbortController();
			return [];
		}

		const textureFile = `/texture/${mapId}/${chunk.id}.bin`;

		if (await file(textureFile).exists()) {
			const data = await file(textureFile).arrayBuffer();

			textures[chunk.id] = {
				width: size,
				height: size,
				data,
			};
			transfers.push(data);

			Atomics.add(textureHits, 0, 1);
			continue;
		}

		const buffer = new Uint8Array(size * size * 3);

		for (const tile of chunk.tiles) {
			if (texturesAbortController.signal.aborted) {
				console.warn("\t - Textures aborted");
				break;
			}

			const color = colorBuffers.get(
				withColorMap({ value: tile.noise, levels: Game.colorMap }),
			)!;

			const startX = tile.pos.x / Game.plotSize;
			const startZ = tile.pos.z / Game.plotSize;

			const destIndex = (startZ * size + startX) * 3;

			for (let row = 0; row < plot; row++) {
				buffer.set(color, destIndex + row * size * 3);
			}
		}

		const compressed = deflateSync(new Uint8Array(buffer), { level: 9 });

		textures[chunk.id] = {
			width: size,
			height: size,
			data: compressed.buffer,
		};
		transfers.push(compressed.buffer);

		write(textureFile, new Uint8Array(compressed));
	}

	console.log(
		`\t- Textures finished [cache ${((100 * Atomics.load(textureHits, 0)) / chunks.length).toFixed(0)}%] [${timer.format()}]`,
	);

	return transfer(textures, transfers);
};

export namespace generator {
	export interface Props {
		mapId: string;
		seed: string;
		hash: ChunkHash;
		size: number;
		colorMap: readonly { color: string }[];
	}
}

const generator = async (props: generator.Props) => {
	const $chunks = await chunks(props);
	return {
		chunks: $chunks,
		textures: await textures({ ...props, chunks: $chunks }),
	} as const;
};

export interface GameWorker {
	chunks: typeof chunks;
	cancelChunks: typeof cancelChunks;

	textures: typeof textures;
	cancelTextures: typeof cancelTextures;

	generator: typeof generator;
}

expose({
	chunks,
	cancelChunks,

	textures,
	cancelTextures,

	generator,
});
