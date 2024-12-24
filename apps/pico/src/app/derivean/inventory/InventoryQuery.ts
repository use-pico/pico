import { queryOf } from "@use-pico/client";
import { dexie } from "~/app/derivean/dexie/dexie";
import { InventoryFilterSchema } from "~/app/derivean/inventory/schema/InventoryFilterSchema";
import { InventorySchema } from "~/app/derivean/inventory/schema/InventorySchema";

export const InventoryQuery = queryOf({
	source: dexie.Inventory,
	schema: {
		entity: InventorySchema,
		filter: InventoryFilterSchema,
	},
	onFilter() {
		return true;
	},
});
