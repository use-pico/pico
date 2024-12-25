import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const InventorySlotFilterSchema = FilterSchema.merge(
	z.object({
		inventoryId: z.string().optional(),
		slotId: z.string().optional(),
	}),
);

export type InventorySlotFilterSchema = typeof InventorySlotFilterSchema;

export namespace InventorySlotFilterSchema {
	export type Type = z.infer<InventorySlotFilterSchema>;
}
