import type { Chunk } from "~/app/derivean/type/Chunk";

export const chunkIdOf = ({ x, z, level }: Chunk.View.Level) => {
	return Array.from({ length: x.max - x.min }, (_, i) =>
		Array.from({ length: z.max - z.min }, (_, j) => {
			const xx = x.min + i;
			const zz = z.min + j;

			return {
				id: `${xx}:${zz}:${level}`,
				x: xx,
				z: zz,
			};
		}),
	).flat();
};
