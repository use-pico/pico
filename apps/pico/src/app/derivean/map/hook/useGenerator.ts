import { XORWow } from "random-seedable";
import { useCallback, useMemo } from "react";
import { createNoise2D } from "simplex-noise";

export namespace useGenerator {
	export namespace Config {
		export interface Tile {
			id: string;
			chance: number;
			noise: number;
			color: string;
			level: "terrain" | "feature";
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
	}

	export namespace Generator {
		export interface Tile {
			id: number;
			tile: Config.Tile;
			x: number;
			z: number;
		}

		export interface Props {
			x: number;
			z: number;
		}
	}
}

const hashStringToSeed = (str: string): number => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash);
};

export const useGenerator = ({ config }: useGenerator.Props) => {
	// Seeded RNG ensures consistent terrain generation
	const seed = useMemo(
		() => new XORWow(hashStringToSeed(config.seed)),
		[config.seed],
	);

	// Noise function using the same seeded RNG
	const noise = useMemo(() => createNoise2D(() => seed.float()), [seed]);

	const { plotCount } = config;
	const baseScale = 1 / (plotCount * config.scale);

	// Pre-sort tiles to optimize biome selection
	const sortedTiles = useMemo(() => {
		return Object.values(config.tiles).sort((a, b) => b.noise - a.noise);
	}, [config.tiles]);

	/**
	 * Get tile type based on noise value + seeded RNG for `chance`
	 */
	const getTileByNoise = useCallback((noiseValue: number, rng: XORWow) => {
		for (const tile of sortedTiles) {
			if (noiseValue >= tile.noise) {
				if (rng.float() < tile.chance / 100) {
					return tile.id;
				}
			}
		}
		return sortedTiles[sortedTiles.length - 1]!.id;
	}, []);

	/**
	 * Generate a chunk using precomputed noise map
	 */
	return ({ x, z }: useGenerator.Generator.Props) => {
		const chunk = new Array<useGenerator.Generator.Tile>(plotCount ** 2);

		const chunkRng = new XORWow(hashStringToSeed(`${config.seed}:${x}:${z}`));

		for (let i = 0; i < chunk.length; i++) {
			const tileX = (i % plotCount) * config.plotSize;
			const tileZ = Math.floor(i / plotCount) * config.plotSize;
			const worldX = (x * plotCount + (i % plotCount)) * baseScale;
			const worldZ = (z * plotCount + Math.floor(i / plotCount)) * baseScale;

			const tileId = getTileByNoise((noise(worldX, worldZ) + 1) / 2, chunkRng);

			chunk[i] = {
				id: i,
				tile: config.tiles[tileId]!,
				x: tileX,
				z: tileZ,
			};
		}

		return chunk;
	};
};
