import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";
import { InventorySchema } from "~/app/derivean/inventory/schema/InventorySchema";
import { SlotSchema } from "~/app/derivean/slot/schema/SlotSchema";

export const InventorySlotSchema = IdentitySchema.merge(
	z.object({
		inventoryId: z.string().min(1),
		inventory: InventorySchema.optional(),
		slotId: z.string().min(1),
		slot: SlotSchema.optional(),
	}),
);

export type InventorySlotSchema = typeof InventorySlotSchema;

export namespace InventorySlotSchema {
	export type Type = z.infer<InventorySlotSchema>;
}
