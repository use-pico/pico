import { z } from "zod";

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
	tile: z.string().min(1),
});

export type EntitySchema = typeof EntitySchema;

export namespace EntitySchema {
	export type Type = z.infer<EntitySchema>;
}
