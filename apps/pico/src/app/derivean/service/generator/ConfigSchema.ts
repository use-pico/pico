import { z } from "zod";

export const ConfigSchema = z.object({
	plotSize: z.number().int().positive(),
	plotCount: z.number().int().positive(),
	chunkSize: z.number().int().positive(),
});

export type ConfigSchema = typeof ConfigSchema;

export namespace ConfigSchema {
	export type Type = z.infer<ConfigSchema>;
}
