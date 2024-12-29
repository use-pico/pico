import { withDatabase } from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import type { InventorySlotSchema } from "~/app/derivean/inventory/slot/InventorySlotSchema";

export interface Database {
	Inventory: withRepositorySchema.Entity<InventorySchema>;
	InventorySlot: withRepositorySchema.Entity<InventorySlotSchema>;
}

export const db = await withDatabase<Database>({
	database: "derivean",
});
