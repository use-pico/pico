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
	onChunk?: (props: { chunk: Chunk.SmallChunk; texture: Texture }) => void,
) => {
	const timer = new Timer();
	timer.start();

	console.log(
		`[Worker] Started generator for [${hash.count} chunks] ${hash.hash}`,
	);

	const chunkHits = new Int32Array(new SharedArrayBuffer(4));
	const textureHits = new Int32Array(new SharedArrayBuffer(4));

	const colorBuffers = new Map<string, Uint8Array>(
		Array.from(colorMap, ({ color }) => {
			const { r, g, b } = hexToRGB(color);
			return [color, new Uint8Array([r, g, b])];
		}),
	);

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

	return Promise.all(
		Array.from({ length: hash.maxX - hash.minX }, (_, i) =>
			Array.from({ length: hash.maxZ - hash.minZ }, async (_, j) => {
				const x = hash.minX + i;
				const z = hash.minZ + j;

				const chunkId = `${x}:${z}`;
				const chunkFile = `/chunk/${mapId}/${chunkId}.borsh`;
				const textureFile = `/texture/${mapId}/${chunkId}.bin`;

				let chunk: Chunk;
				let texture: Texture;

				if (await file(chunkFile).exists()) {
					Atomics.add(chunkHits, 0, 1);
					chunk = deserialize(
						ChunkBorshSchema,
						decompressSync(new Uint8Array(await file(chunkFile).arrayBuffer())),
					) as Chunk;
				} else {
					chunk = {
						id: chunkId,
						x,
						z,
						tiles: generator({ x, z }),
					} as const;

					await write(
						chunkFile,
						deflateSync(serialize(ChunkBorshSchema, chunk), { level: 9 }),
					);
				}

				if (await file(textureFile).exists()) {
					Atomics.add(textureHits, 0, 1);
					texture = {
						width: size,
						height: size,
						data: await file(textureFile).arrayBuffer(),
					};
				} else {
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

					texture = {
						width: size,
						height: size,
						data: data.buffer,
					};

					await write(textureFile, new Uint8Array(data));
				}

				onChunk?.({ chunk, texture });

				return { chunk, texture };
			}),
		).flat(),
	).then((data) => {
		console.log(
			`[Worker]\t - Finished [chunk hits ${((100 * Atomics.load(chunkHits, 0)) / data.length).toFixed(0)}%, texture hits ${((100 * Atomics.load(textureHits, 0)) / data.length).toFixed(0)}%] [${timer.format()}]`,
		);

		return data;
	});
};

export interface GameWorker {
	generator: typeof generator;
}

expose({
	generator,
});
