import type { z } from "zod";

/**
 * Hack to get partial schema from Zod.
 */
export type PartialSchema<TSchema extends z.ZodObject<any>> = ReturnType<
	TSchema["partial"]
>;
