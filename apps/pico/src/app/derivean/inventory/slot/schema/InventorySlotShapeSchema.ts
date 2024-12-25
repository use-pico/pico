import { z } from "zod";

export const InventorySlotShapeSchema = z.object({
	inventoryId: z.string().min(1),
	slotId: z.string().min(1),
});

export type InventorySlotShapeSchema = typeof InventorySlotShapeSchema;

export namespace InventorySlotShapeSchema {
	export type Type = z.infer<InventorySlotShapeSchema>;
}
