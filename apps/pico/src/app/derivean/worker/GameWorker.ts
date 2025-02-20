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

const generator = async (
	{ mapId, seed, hash, size, colorMap }: generator.Props,
	onChunk?: (props: { hit: boolean; chunk: Chunk }) => void,
	onTexture?: (props: { hit: boolean; texture: Texture }) => void,
) => {
	const timer = new Timer();
	timer.start();

	console.log(
		`[Worker] Started generator for [${hash.count} chunks] ${hash.hash}`,
	);

	const chunkHits = new Int32Array(new SharedArrayBuffer(4));
	const textureHits = new Int32Array(new SharedArrayBuffer(4));

	const generator = withGenerator({
		plotCount: Game.plotCount,
		plotSize: Game.plotSize,
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
		layers: () => [],
	});

	const colorBuffers = new Map<string, Uint8Array>(
		Array.from(colorMap.values(), ({ color }) => {
			const { r, g, b } = hexToRGB(color);
			return [color, new Uint8Array([r, g, b])];
		}),
	);

	const chunks: Chunk.SmallChunk[] = [];
	const textures: Record<string, Texture> = {};

	const awaitJobs = Array.from({ length: hash.maxX - hash.minX }, (_, i) =>
		Array.from({ length: hash.maxZ - hash.minZ }, (_, j) => {
			const x = hash.minX + i;
			const z = hash.minZ + j;

			return new Promise<void>((resolve) => {
				setTimeout(() => {
					generateChunk({ generator, mapId, x, z }).then(({ hit, chunk }) => {
						chunks.push({
							id: chunk.id,
							x: chunk.x,
							z: chunk.z,
						});

						if (hit) {
							Atomics.add(chunkHits, 0, 1);
						}

						onChunk?.({ hit, chunk });

						new Promise<void>((resolve) => {
							setTimeout(() => {
								generateTexture({ mapId, chunk, colorBuffers, size }).then(
									({ hit, texture }) => {
										textures[chunk.id] = texture;
										if (hit) {
											Atomics.add(textureHits, 0, 1);
										}
										onTexture?.({ hit, texture });
										resolve();
									},
								);
							}, 0);
						}).then(resolve);
					});
				}, 0);
			});
		}),
	).flat();

	await Promise.allSettled(awaitJobs);

	console.log(
		`[Worker]\t - Finished [chunk hits ${((100 * Atomics.load(chunkHits, 0)) / chunks.length).toFixed(0)}%, texture hits ${((100 * Atomics.load(textureHits, 0)) / chunks.length).toFixed(0)}%] [${timer.format()}]`,
	);

	return { chunks, textures } as const;
};

export interface GameWorker {
	generator: typeof generator;
}

expose({
	generator,
});
