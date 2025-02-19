import { hexToRGB, Timer } from "@use-pico/common";
import { deserialize, serialize } from "borsh";
import { expose } from "comlink";
import { decompressSync, deflateSync } from "fflate";
import { file, write } from "opfs-tools";
import { Game } from "~/app/derivean/Game";
import { withLandNoise } from "~/app/derivean/map/noise/withLandNoise";
import { ChunkBorshSchema } from "~/app/derivean/service/generator/ChunkBorshSchema";
import { withColorMap } from "~/app/derivean/service/generator/withColorMap";
import { withGenerator } from "~/app/derivean/service/generator/withGenerator";
import type { Texture } from "~/app/derivean/Texture";
import type { Chunk } from "~/app/derivean/type/Chunk";
import type { ChunkHash } from "~/app/derivean/type/ChunkHash";

export namespace generateChunk {
	export interface Props {
		generator: withGenerator.Generator;
		mapId: string;
		x: number;
		z: number;
	}
}

const generateChunk = async ({
	generator,
	mapId,
	x,
	z,
}: generateChunk.Props): Promise<{ hit: boolean; chunk: Chunk }> => {
	const chunkId = `${x}:${z}`;
	const chunkFile = `/chunk/${mapId}/${chunkId}.borsh`;

	console.log(`Chunk [${x}:${z}]`);

	/**
	 * File reading does not throw an error, so it's necessary to check
	 * for existence.
	 */
	if (await file(chunkFile).exists()) {
		const data = deserialize(
			ChunkBorshSchema,
			decompressSync(new Uint8Array(await file(chunkFile).arrayBuffer())),
		) as Chunk;

		return {
			hit: true,
			chunk: data,
		};
	}

	const data = {
		id: chunkId,
		x,
		z,
		tiles: generator({ x, z }),
	} as const;

	await write(
		chunkFile,
		deflateSync(serialize(ChunkBorshSchema, data), { level: 9 }),
	);

	console.log(`Chunk done [${x}:${z}]`);

	return {
		hit: false,
		chunk: data,
	};
};

export namespace generateTexture {
	export interface Props {
		mapId: string;
		chunk: Chunk;
		size: number;
		colorBuffers: Map<string, Uint8Array>;
	}
}

export const generateTexture = async ({
	mapId,
	chunk,
	size,
	colorBuffers,
}: generateTexture.Props): Promise<{ hit: boolean; texture: Texture }> => {
	const textureFile = `/texture/${mapId}/${chunk.id}.bin`;

	console.log(`Texture [${chunk.id}]`);

	if (await file(textureFile).exists()) {
		return {
			hit: true,
			texture: {
				width: size,
				height: size,
				data: await file(textureFile).arrayBuffer(),
			},
		};
	}

	const buffer = new Uint8Array(size * size * 3);

	for (const tile of chunk.tiles) {
		const color = colorBuffers.get(
			withColorMap({ value: tile.noise, levels: Game.colorMap }),
		)!;

		const startX = tile.pos.x / Game.plotSize;
		const startZ = tile.pos.z / Game.plotSize;

		buffer.set(color, (startZ * size + startX) * 3);
	}

	const data = deflateSync(new Uint8Array(buffer), { level: 9 });

	await write(textureFile, new Uint8Array(data));

	console.log(`Texture done [${chunk.id}]`);

	return {
		hit: false,
		texture: {
			width: size,
			height: size,
			data: data.buffer,
		},
	};
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

const generator = async ({
	mapId,
	seed,
	hash,
	size,
	colorMap,
}: generator.Props) => {
	const timer = new Timer();
	timer.start();

	console.log(`[Worker] Started generator ${hash.hash}`);

	const awaitChunks: Promise<any>[] = [];
	const awaitTextures: Promise<any>[] = [];
	const chunks: Chunk[] = [];
	const textures: Record<string, Texture> = {};

	const chunkHits = new Int32Array(new SharedArrayBuffer(4));
	const textureHits = new Int32Array(new SharedArrayBuffer(4));

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

	const colorBuffers = new Map<string, Uint8Array>();
	for (const { color } of colorMap.values()) {
		const { r, g, b } = hexToRGB(color);
		colorBuffers.set(color, new Uint8Array([r, g, b]));
	}

	for (let x = hash.minX; x < hash.maxX; x++) {
		for (let z = hash.minZ; z < hash.maxZ; z++) {
			awaitChunks.push(
				generateChunk({
					generator,
					mapId,
					x,
					z,
				}).then(({ hit, chunk }) => {
					hit && Atomics.add(chunkHits, 0, 1);
					chunks.push(chunk);
					awaitTextures.push(
						generateTexture({ mapId, chunk, colorBuffers, size }).then(
							({ hit, texture }) => {
								hit && Atomics.add(textureHits, 0, 1);
								textures[chunk.id] = texture;
							},
						),
					);
				}),
			);
		}
	}

	await Promise.all(awaitChunks);
	await Promise.all(awaitTextures);

	console.log(
		`[Worker]\t - Finished [chunk hits ${((100 * Atomics.load(chunkHits, 0)) / chunks.length).toFixed(0)}%, texture hits ${((100 * Atomics.load(textureHits, 0)) / chunks.length).toFixed(0)}%] [${timer.format()}]`,
	);

	return {
		chunks,
		textures,
	} as const;
};

export interface GameWorker {
	generator: typeof generator;
}

expose({
	generator,
});
