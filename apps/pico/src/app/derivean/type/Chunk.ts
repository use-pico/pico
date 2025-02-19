import type { EntitySchema } from "~/app/derivean/service/generator/EntitySchema";

export interface Chunk {
	id: string;
	x: number;
	z: number;
	tiles: EntitySchema.Type[];
}
