import { z } from "zod";
import { TileSchema } from "~/app/derivean/service/generator/TileSchema";

/**
 * Generated entity on a map.
 */
export const EntitySchema = z.object({
	pos: z.object({
		x: z.number(),
		z: z.number(),
	}),
	abs: z.object({
		x: z.number(),
		z: z.number(),
	}),
	noise: z.number(),
	tile: TileSchema,
});

export type EntitySchema = typeof EntitySchema;

export namespace EntitySchema {
	export type Type = z.infer<EntitySchema>;
}
