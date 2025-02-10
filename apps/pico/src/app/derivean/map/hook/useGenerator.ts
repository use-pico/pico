import { LRUCache } from "lru-cache";
import { XORWow } from "random-seedable";
import { useCallback, useRef } from "react";
import { createNoise2D } from "simplex-noise";

const hashStringToSeed = (str: string): number => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash);
};

export namespace useGenerator {
	export namespace Config {
		export interface Tile {
			id: string;
			chance: number;
			noise: number;
			color: number;
			level: "terrain" | "feature";
			height?: number;
		}

		export interface Config {
			seed: string;
			tiles: Record<string, Tile>;
			plotCount: number;
			plotSize: number;
			scale: number;
		}
	}

	export interface Props {
		config: Config.Config;
		cache?: number;
	}

	export namespace Generator {
		export interface Tile {
			id: number;
			tileId: string;
			x: number;
			y: number;
			z: number;
			height: number;
		}

		export interface Props {
			x: number;
			z: number;
		}
	}
}

export const useGenerator = ({ config, cache = 1024 }: useGenerator.Props) => {
	const seedRef = useRef(new XORWow(hashStringToSeed(config.seed)));
	const cacheRef = useRef(
		new LRUCache<string, any>({ max: cache, ttl: 1000 * 60 * 30 }),
	);
	const noiseRef = useRef(
		createNoise2D(() => {
			return seedRef.current.float();
		}),
	);
	const { plotCount } = config;
	const baseScale = 1 / (plotCount * config.scale);

	/**
	 * Generate a Noise Map Per Chunk
	 */
	const generateNoiseMap = useCallback((chunkX: number, chunkZ: number) => {
		const noiseGrid = new Array(plotCount ** 2);

		for (let row = 0; row < plotCount; row++) {
			for (let col = 0; col < plotCount; col++) {
				const worldX = (chunkX * plotCount + col) * baseScale;
				const worldZ = (chunkZ * plotCount + (plotCount - row - 1)) * baseScale;

				const noiseValue = noiseRef.current(worldX, worldZ);
				noiseGrid[row * plotCount + col] = (noiseValue + 1) / 2;
			}
		}
		return noiseGrid;
	}, []);

	const sortedTiles = useRef(
		Object.values(config.tiles).sort((a, b) => b.noise - a.noise),
	).current;

	/**
	 * Get tile type based on noise value
	 */
	const getTileByNoise = useCallback((noiseValue: number) => {
		for (const tile of sortedTiles) {
			if (noiseValue >= tile.noise) {
				return tile.id;
			}
		}

		return sortedTiles[sortedTiles.length - 1]!.id;
	}, []);

	/**
	 * Generate a chunk using precomputed noise map
	 */
	return ({ x, z }: useGenerator.Generator.Props) => {
		const cacheId = `${x}:${z}`;
		const cached = cacheRef.current.get(cacheId);

		if (cached) {
			return cached;
		}

		const noiseGrid = generateNoiseMap(x, z);
		const chunk: useGenerator.Generator.Tile[] = new Array(plotCount ** 2);

		for (let row = 0; row < plotCount; row++) {
			for (let col = 0; col < plotCount; col++) {
				const noiseValue = noiseGrid[row * plotCount + col];
				const tileId = getTileByNoise(noiseValue);

				const id = (plotCount - row - 1) * plotCount + col;

				const tileX = id % config.plotCount;
				const tileZ = Math.floor(id / config.plotCount);

				chunk[id] = {
					id,
					tileId,
					x: tileX * config.plotSize,
					y: noiseValue,
					z: tileZ * config.plotSize,
					height: config.tiles[tileId]!.height || 0,
				};
			}
		}

		cacheRef.current.set(cacheId, chunk);
		return chunk;
	};
};
