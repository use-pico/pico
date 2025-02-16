import { z } from "zod";

/**
 * Tile definition used in generator configuration.
 */
export const TileSchema = z.object({
	id: z.string().min(1),
	chance: z.number().nonnegative(),
	noise: z.number().nonnegative(),
	color: z.string().regex(/^#[0-9A-Fa-f]{6}$/gu, {
		message: "Invalid hex color format",
	}),
});

export type TileSchema = typeof TileSchema;

export namespace TileSchema {
	export type Type = z.infer<TileSchema>;
}
