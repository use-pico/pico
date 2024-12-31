import { withDatabase } from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import type { BuildingRequirementResourceSchema } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceSchema";
import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import type { InventorySlotSchema } from "~/app/derivean/inventory/slot/InventorySlotSchema";
import type { ItemSchema } from "~/app/derivean/item/ItemSchema";
import type { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import type { SlotSchema } from "~/app/derivean/slot/SlotSchema";

export interface Database {
	Resource: withRepositorySchema.Entity<ResourceSchema>;

	BaseBuilding: withRepositorySchema.Entity<BaseBuildingSchema>;
	Building: withRepositorySchema.Entity<BuildingSchema>;
	BuildingRequirementResource: withRepositorySchema.Entity<BuildingRequirementResourceSchema>;

	/**
	 * Maybe obsolete?
	 */
	Inventory: withRepositorySchema.Entity<InventorySchema>;
	InventorySlot: withRepositorySchema.Entity<InventorySlotSchema>;
	Slot: withRepositorySchema.Entity<SlotSchema>;
	Item: withRepositorySchema.Entity<ItemSchema>;
}

export const db = await withDatabase<Database>({
	database: "derivean",
	async bootstrap() {
		// const dexie = new Dexie("derivean");
		// dexie.version(1).stores({
		// User: "id, login&",
		// 	Resource: "id, name",
		// 	BaseBuilding: "id, name&",
		// 	Building: "id, baseBuildingId, userId",
		// 	BuildingRequirementResource: "id, buildingId, resourceId",
		// 	Inventory: "id, name&",
		// 	Slot: "id, [kind+name]&",
		// 	InventorySlot: "id, inventoryId, slotId",
		// 	Item: "id, name",
		// });
		/**
		 * Force table & index creation.
		 */
		// await dexie.open();
		// dexie.close();
	},
});
