import { z } from "zod";

export const BlueprintSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	count: z.number().int().nonnegative(),
});

export type BlueprintSchema = typeof BlueprintSchema;

export namespace BlueprintSchema {
	export type Type = z.infer<BlueprintSchema>;
}
