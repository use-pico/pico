import type { Chunk } from "~/app/derivean/type/Chunk";

export const chunkIdOf = ({ minX, maxX, minZ, maxZ }: Chunk.Hash) => {
	return Array.from({ length: maxX - minX }, (_, i) =>
		Array.from({ length: maxZ - minZ }, (_, j) => {
			const x = minX + i;
			const z = minZ + j;

			return {
				id: `${x}:${z}`,
				x,
				z,
			};
		}),
	).flat();
};
