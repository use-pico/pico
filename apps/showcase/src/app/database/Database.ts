import type { InventoryItemSchema } from "../inventory/db/InventoryItemSchema";

export interface Database {
	inventory: InventoryItemSchema.Type;
}
