import { z } from "zod";

export const BlueprintInventorySchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	amount: z.number().nonnegative(),
	limit: z.number().nonnegative(),
});

export type BlueprintInventorySchema = typeof BlueprintInventorySchema;

export namespace BlueprintInventorySchema {
	export type Type = z.infer<BlueprintInventorySchema>;
}
