import { EntitySchema } from "@use-pico/common";
import z from "zod";

export const InventoryItemSchema = z.object({
	...EntitySchema.shape,
	name: z.string(),
	description: z.string().nullish(),
	amount: z.number(),
	kind: z.enum([
		"WEAPON",
		"ARMOR",
		"CONSUMABLE",
		"MAGICAL",
	]),
	type: z.enum([
		"COMMON",
		"RARE",
		"EPIC",
		"LEGENDARY",
	]),
});

export type InventoryItemSchema = typeof InventoryItemSchema;

export namespace InventoryItemSchema {
	export type Type = z.infer<InventoryItemSchema>;
}
