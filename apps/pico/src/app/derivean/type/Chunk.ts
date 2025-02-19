import type { EntitySchema } from "~/app/derivean/service/generator/EntitySchema";

export namespace Chunk {
	export type SmallChunk = Omit<Chunk, "tiles">;
}

export interface Chunk {
	id: string;
	x: number;
	z: number;
	tiles: EntitySchema.Type[];
}
