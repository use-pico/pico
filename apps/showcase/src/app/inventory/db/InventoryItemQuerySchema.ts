import { FilterSchema, withQuerySchema } from "@use-pico/common/schema";
import z from "zod";

export const InventoryItemQuerySchema = withQuerySchema({
	filter: z.object({
		...FilterSchema.shape,
		name: z.string().nullish(),
		description: z.string().nullish(),
		kind: z.string().nullish(),
		type: z.string().nullish(),
		amountLte: z.number().nullish(),
		amountGte: z.number().nullish(),
	}),
	sort: [
		"name",
		"kind",
		"type",
		"amount",
	],
});

export type InventoryItemQuerySchema = typeof InventoryItemQuerySchema;

export namespace InventoryItemQuerySchema {
	export type Type = z.infer<typeof InventoryItemQuerySchema>;
}
