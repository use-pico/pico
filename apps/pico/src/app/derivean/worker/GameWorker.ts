import { Timer } from "@use-pico/common";
import { expose, transfer } from "comlink";
import { LRUCache } from "lru-cache";
import { Game } from "~/app/derivean/Game";
import type { Chunks } from "~/app/derivean/map/Chunks";
import { withLandNoise } from "~/app/derivean/map/noise/withLandNoise";
import { withColorMap } from "~/app/derivean/service/generator/withColorMap";
import { withGenerator } from "~/app/derivean/service/generator/withGenerator";
import type { Texture } from "~/app/derivean/Texture";

const chunkCache = new LRUCache<string, Chunks.Chunk>({
	max: 32,
	ttl: 1000 * 60 * 60,
});
const textureCache = new LRUCache<string, ImageData>({
	max: 16,
	ttl: 1000 * 60 * 60,
});

const chunks = async (
	seed: string,
	minX: number,
	maxX: number,
	minZ: number,
	maxZ: number,
	count: number,
	hash: string,
) => {
	const timer = new Timer();
	timer.start();

	console.log(`Generating chunks ${hash}`);

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

	const chunks = new Array(count);

	let hit = 0;

	let index = 0;
	for (let x = minX; x < maxX; x++) {
		for (let z = minZ; z < maxZ; z++) {
			const cacheId = `${x}:${z}`;
			const chunk = chunkCache.get(cacheId);
			if (chunk) {
				chunks[index++] = chunk;
				hit++;
				continue;
			}
			chunkCache.set(
				cacheId,
				(chunks[index++] = {
					id: cacheId,
					x,
					z,
					tiles: generator({ x, z }),
				}),
			);
		}
	}

	console.log(`\t- Finished [hit ${hit}/${count}] [${timer.format()}]`);

	return chunks;
};

export const textures = async (
	chunks: Chunks.Chunk[],
	chunkSize: number,
	hash: string,
) => {
	const timer = new Timer();
	timer.start();

	console.log(`Generating textures ${hash}`);

	const textures: Record<string, Texture> = {};

	const canvas = new OffscreenCanvas(chunkSize, chunkSize);
	const ctx = canvas.getContext("2d", { willReadFrequently: true });

	if (!ctx) {
		console.error("Cannot use OffscreenCanvas");
		return textures;
	}

	const transfers: ArrayBufferLike[] = [];

	let hit = 0;

	for (const chunk of chunks) {
		const bitmap = textureCache.get(chunk.id);
		if (bitmap) {
			textures[chunk.id] = {
				width: bitmap.width,
				height: bitmap.height,
				data: bitmap.data.buffer,
			};
			transfers.push(bitmap.data.buffer);

			/**
			 * Clone image data, so it won't be lost on transfer.
			 */
			textureCache.set(
				chunk.id,
				new ImageData(
					new Uint8ClampedArray(bitmap.data),
					bitmap.width,
					bitmap.height,
				),
			);
			hit++;
			continue;
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		chunk.tiles.forEach((tile) => {
			ctx.fillStyle = withColorMap({
				value: tile.noise,
				levels: Game.colorMap,
			});
			ctx.fillRect(tile.pos.x, tile.pos.z, Game.plotSize, Game.plotSize);
		});

		const image = ctx.getImageData(0, 0, canvas.width, canvas.height);

		textures[chunk.id] = {
			width: canvas.width,
			height: canvas.height,
			data: image.data.buffer,
		};
		transfers.push(image.data.buffer);

		textureCache.set(
			chunk.id,
			new ImageData(
				new Uint8ClampedArray(image.data),
				image.width,
				image.height,
			),
		);
	}

	console.log(`\t- Finished [hit ${hit}/${chunks.length}] [${timer.format()}]`);

	return transfer(textures, transfers);
};

export interface GameWorker {
	chunks: typeof chunks;
	textures: typeof textures;
}

const api = {
	chunks,
	textures,
};

expose(api);
