import { LRUCache } from "lru-cache";
import { XORWow } from "random-seedable";
import { useCallback, useRef } from "react";

export namespace useGenerator {
	export namespace Config {
		export interface Link {
			id: string;
			chance: number;
		}

		export interface Tile {
			id: string;
			chance: number;
			link: Record<string, Link>;
			color: number;
		}

		export interface Config {
			seed: number;
			tiles: Record<string, Tile>;
			size: number;
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

	const canLink = (
		tileA: useGenerator.Config.Tile,
		tileB: useGenerator.Config.Tile | undefined,
	) => {
		if (!tileB) {
			return true;
		}

		return Object.values(tileA.link).some((t) => t.id === tileB.id);
	};

	const tile = useCallback(
		({
			current,
			neighbors,
		}: {
			current: useGenerator.Config.Tile;
			neighbors: (string | undefined)[];
		}) => {
			if (!current.link.length) {
				return current.id;
			}

			const neighborTiles = neighbors
				.filter((id) => Boolean(id))
				.map((id) => config.tiles[id!]!);

			const available = Object.values(current.link).filter((t) =>
				neighborTiles.every((neighbor) =>
					canLink(config.tiles[t.id]!, neighbor),
				),
			);

			if (!available.length) {
				return current.id;
			}

			const weight = available.reduce((sum, { chance }) => sum + chance, 0);
			let random = seedRef.current.randRange(0, weight);

			for (const link of available) {
				if (random < link.chance) {
					return link.id;
				}
				random -= link.chance;
			}

			return current.id;
		},
		[],
	);

	return ({ x, z }: useGenerator.Generator.Props) => {
		const cacheId = `${x}:${z}`;

		if (cacheRef.current.has(cacheId)) {
			return cacheRef.current.get(cacheId);
		}

		const chunk: useGenerator.Generator.Tile[] = [];
		const { size } = config;

		for (let id = 0; id < size ** 2; id++) {
			const row = id % size;
			const col = Math.floor(id / size);

			const left = col > 0 ? chunk[id - size]?.tileId : undefined;
			const right = col < size - 1 ? chunk[id + size]?.tileId : undefined;
			const bottom = row > 0 ? chunk[id - 1]?.tileId : undefined;
			const top = row < size - 1 ? chunk[id + 1]?.tileId : undefined;

			const bottomLeft =
				col > 0 && row > 0 ? chunk[id - size - 1]?.tileId : undefined;
			const bottomRight =
				col < size - 1 && row > 0 ? chunk[id - size + 1]?.tileId : undefined;
			const topLeft =
				col > 0 && row < size - 1 ? chunk[id + size - 1]?.tileId : undefined;
			const topRight =
				col < size - 1 && row < size - 1 ?
					chunk[id + size + 1]?.tileId
				:	undefined;

			const selectedTile = seedRef.current.choice(Object.values(config.tiles));
			const finalTileId = tile({
				current: selectedTile,
				neighbors: [
					left,
					right,
					bottom,
					top,
					bottomLeft,
					bottomRight,
					topLeft,
					topRight,
				],
			});

			chunk.push({ id, tileId: finalTileId });
		}

		console.log("Generated", { x, z, chunk });

		cacheRef.current.set(cacheId, chunk);
		return chunk;
	};
};
