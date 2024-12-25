import { queryOf } from "@use-pico/client";
import { dexie } from "~/app/derivean/dexie/dexie";
import { InventoryFilterSchema } from "~/app/derivean/inventory/schema/InventoryFilterSchema";
import { InventorySchema } from "~/app/derivean/inventory/schema/InventorySchema";
import { InventoryShapeSchema } from "~/app/derivean/inventory/schema/InventoryShapeSchema";

export const InventoryQuery = queryOf({
	name: "InventoryQuery",
	source: dexie.Inventory,
	schema: {
		entity: InventorySchema,
		shape: InventoryShapeSchema,
		filter: InventoryFilterSchema,
	},
	onFilter() {
		return true;
	},
});
