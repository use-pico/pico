import type { InventoryItemSchema } from "../inventory/db/InventoryItemSchema";

export interface Database {
	InventoryItem: InventoryItemSchema.Type;
}
