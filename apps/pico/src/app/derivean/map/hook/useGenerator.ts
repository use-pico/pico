import { XORWow } from "random-seedable";
import { useCallback, useMemo } from "react";
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

export const useGenerator = ({ config }: useGenerator.Props) => {
	const seed = useMemo(
		() => new XORWow(hashStringToSeed(config.seed)),
		[config.seed],
	);
	const noise = useMemo(() => createNoise2D(() => seed.float()), [seed]);
	const { plotCount, plotSize } = config;
	const baseScale = 1 / (plotCount * config.scale);

	/**
	 * Generate a Noise Map Per Chunk
	 */
	const generateNoiseMap = useCallback(
		(chunkX: number, chunkZ: number) => {
			const noiseGrid = new Float32Array(plotCount ** 2);
			for (let i = 0; i < noiseGrid.length; i++) {
				const col = i % plotCount;
				const row = Math.floor(i / plotCount);

				const worldX = (chunkX * plotCount + col) * baseScale;
				const worldZ = (chunkZ * plotCount + (plotCount - row - 1)) * baseScale;

				noiseGrid[i] = (noise(worldX, worldZ) + 1) / 2;
			}
			return noiseGrid;
		},
		[plotCount, baseScale, noise],
	);

	/**
	 * Sort tiles by noise threshold (descending order)
	 */
	const sortedTiles = useMemo(
		() => Object.values(config.tiles).sort((a, b) => b.noise - a.noise),
		[config.tiles],
	);

	/**
	 * Get tile type based on noise value
	 */
	const getTileByNoise = useCallback(
		(noiseValue: number) => {
			for (const tile of sortedTiles) {
				if (noiseValue >= tile.noise) {
					return tile.id;
				}
			}
			return sortedTiles[sortedTiles.length - 1]!.id;
		},
		[sortedTiles],
	);

	/**
	 * Generate a chunk using precomputed noise map
	 */
	return ({ x, z }: useGenerator.Generator.Props) => {
		const noiseGrid = generateNoiseMap(x, z);
		const chunk = new Array<useGenerator.Generator.Tile>(plotCount ** 2);

		for (let i = 0; i < chunk.length; i++) {
			const col = i % plotCount;
			const row = Math.floor(i / plotCount);
			const tileId = getTileByNoise(noiseGrid[i]!);

			const tileX = col * plotSize;
			const tileZ = (plotCount - row - 1) * plotSize;

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
