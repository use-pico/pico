import { z } from "zod";

export const InventorySchema = z.object({
	id: z.string().min(1),
	amount: z.number().nonnegative(),
	limit: z.number().nonnegative(),
	name: z.string().min(1),
});

export type InventorySchema = typeof InventorySchema;

export namespace InventorySchema {
	export type Type = z.infer<InventorySchema>;
}
