import { EntitySchema } from "@use-pico/common";
import z from "zod";

export const InventoryItemSchema = z.object({
	...EntitySchema.shape,
	name: z.string(),
	description: z.string().nullish(),
	amount: z.number(),
});

export type InventoryItemSchema = typeof InventoryItemSchema;

export namespace InventoryItemSchema {
	export type Type = z.infer<InventoryItemSchema>;
}
