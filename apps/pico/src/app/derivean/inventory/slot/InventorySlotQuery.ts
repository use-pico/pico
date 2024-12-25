import { queryOf } from "@use-pico/client";
import { dexie } from "~/app/derivean/dexie/dexie";
import { InventorySlotFilterSchema } from "~/app/derivean/inventory/slot/schema/InventorySlotFilterSchema";
import { InventorySlotSchema } from "~/app/derivean/inventory/slot/schema/InventorySlotSchema";
import { InventorySlotShapeSchema } from "~/app/derivean/inventory/slot/schema/InventorySlotShapeSchema";

export const InventorySlotQuery = queryOf({
	name: "InventorySlotQuery",
	source: dexie.InventorySlot,
	schema: {
		entity: InventorySlotSchema,
		shape: InventorySlotShapeSchema,
		filter: InventorySlotFilterSchema,
	},
	onFilter({ entity, filter }) {
		const checks = [true];

		if (filter?.inventoryId) {
			checks.push(entity.inventoryId === filter.inventoryId);
		}
		if (filter?.slotId) {
			checks.push(entity.slotId === filter.slotId);
		}

		return checks.every((check) => check);
	},
});
