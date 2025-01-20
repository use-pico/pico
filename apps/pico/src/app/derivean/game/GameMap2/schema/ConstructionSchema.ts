import { z } from "zod";

export const ConstructionSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	count: z.number().int().nonnegative(),
});

export type ConstructionSchema = typeof ConstructionSchema;

export namespace ConstructionSchema {
	export type Type = z.infer<ConstructionSchema>;
}
