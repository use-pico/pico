import { LRUCache } from "lru-cache";
import { XORWow } from "random-seedable";
import { useCallback, useRef } from "react";
import { createNoise2D } from "simplex-noise";

export namespace useGenerator {
	export namespace Config {
		export interface Tile {
			id: string;
			chance: number;
			noise: number;
			color: number;
			level: "terrain" | "feature";
		}

		export interface Config {
			seed: number;
			tiles: Record<string, Tile>;
			plotCount: number;
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
		}

		export interface Props {
			x: number;
			z: number;
		}
	}
}

export const useGenerator = ({ config, cache = 1024 }: useGenerator.Props) => {
	const seedRef = useRef(new XORWow(config.seed));
	const cacheRef = useRef(
		new LRUCache<string, any>({
			max: cache,
			ttl: 1000 * 60 * 5,
		}),
	);
	const noiseRef = useRef(
		createNoise2D(() => {
			return seedRef.current.float();
		}),
	);
	const { plotCount } = config;

	/**
	 * Fractal Brownian Motion (FBM) for smoother noise transitions.
	 */
	const fbm = useCallback(
		({
			x,
			z,
			scale,
			octaves = 4,
			persistence = 0.4,
		}: {
			x: number;
			z: number;
			scale: number;
			octaves?: number;
			persistence?: number;
		}) => {
			let total = 0;
			let frequency = scale;
			let amplitude = 1;
			let maxValue = 0;

			for (let i = 0; i < octaves; i++) {
				total += noiseRef.current(x * frequency, z * frequency) * amplitude;
				maxValue += amplitude;
				amplitude *= persistence;
				frequency *= 2;
			}

			return (total / maxValue + 1) / 2;
		},
		[],
	);

	/**
	 * Determine tile type based on noise value.
	 */
	const getTileByNoise = useCallback((noiseValue: number) => {
		const sortedTiles = Object.values(config.tiles).sort(
			(a, b) => b.noise - a.noise,
		);

		for (const tile of sortedTiles) {
			if (noiseValue >= tile.noise) {
				return tile.id;
			}
		}

		return sortedTiles[sortedTiles.length - 1]!.id;
	}, []);

	/**
	 * Generate tile based on globally-consistent FBM noise function.
	 */
	const tile = useCallback(
		({ worldX, worldZ }: { worldX: number; worldZ: number }) => {
			const baseScale = 1 / (plotCount * 4);
			const noiseValue = fbm({
				x: worldX,
				z: worldZ,
				scale: baseScale,
				octaves: 4,
				persistence: 0.5,
			});

			return getTileByNoise(noiseValue);
		},
		[getTileByNoise],
	);

	return ({ x, z }: useGenerator.Generator.Props) => {
		const cacheId = `${x}:${z}`;

		if (cacheRef.current.has(cacheId)) {
			return cacheRef.current.get(cacheId);
		}

		const chunk: useGenerator.Generator.Tile[] = [];

		for (let id = 0; id < plotCount ** 2; id++) {
			const row = id % plotCount;
			const col = Math.floor(id / plotCount);

			const worldX = x * plotCount + col;
			const worldZ = z * plotCount + row;

			console.log("sizes", {
				plotCount,
				x,
				z,
				worldX,
				worldZ,
				row,
				col,
			});

			const finalTileId = tile({ worldX, worldZ });

			chunk.push({ id, tileId: finalTileId });
		}

		cacheRef.current.set(cacheId, chunk);
		return chunk;
	};
};
