import { z } from "zod";

/**
 * This schema represents an empty object (void).
 */
export const VoidSchema = z.object({}).passthrough().nullish();
export type VoidSchema = typeof VoidSchema;
export namespace VoidSchema {
	export type Type = z.infer<VoidSchema>;
}
