import { Timer } from "@use-pico/common";
import { expose } from "comlink";
import { LRUCache } from "lru-cache";
import { Game } from "~/app/derivean/Game";
import { withLandNoise } from "~/app/derivean/map/noise/withLandNoise";
import { withGenerator } from "~/app/derivean/service/generator/withGenerator";

const cache = new LRUCache({
	max: 256,
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

	console.log(`Generating ${hash}`);

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
	let index = 0;
	for (let x = minX; x < maxX; x++) {
		for (let z = minZ; z < maxZ; z++) {
			const cacheId = `${x}:${z}`;
			const chunk = cache.get(cacheId);
			if (chunk) {
				chunks[index++] = chunk;
				continue;
			}
			cache.set(
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

	console.log(`\t- Finished [${timer.format()}]`);

	return chunks;
};

export interface GameWorker {
	chunks: typeof chunks;
}

const api = {
	chunks,
};

expose(api);
