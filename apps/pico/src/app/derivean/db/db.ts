import { withDatabase } from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import type { InventorySlotSchema } from "~/app/derivean/inventory/slot/InventorySlotSchema";
import type { ItemSchema } from "~/app/derivean/item/ItemSchema";
import type { SlotSchema } from "~/app/derivean/slot/SlotSchema";

export interface Database {
	Inventory: withRepositorySchema.Entity<InventorySchema>;
	InventorySlot: withRepositorySchema.Entity<InventorySlotSchema>;
	Slot: withRepositorySchema.Entity<SlotSchema>;
	Item: withRepositorySchema.Entity<ItemSchema>;
}

export const db = await withDatabase<Database>({
	database: "derivean",
});
