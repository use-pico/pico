import Dexie, { type EntityTable } from "dexie";
import type { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import type { UserBlueprintSchema } from "~/app/derivean/blueprint/schema/UserBlueprintSchema";
import type { InventorySchema } from "~/app/derivean/inventory/schema/InventorySchema";
import type { ItemSchema } from "~/app/derivean/item/schema/ItemSchema";
import type { SlotSchema } from "~/app/derivean/slot/schema/SlotSchema";

export interface DexieType extends Dexie {
	Blueprint: EntityTable<BlueprintSchema.Type, "id">;
	UserBlueprint: EntityTable<UserBlueprintSchema.Type, "id">;
	Item: EntityTable<ItemSchema.Type, "id">;
	Inventory: EntityTable<InventorySchema.Type, "id">;
	Slot: EntityTable<SlotSchema.Type, "id">;
}

export const dexie = new Dexie("derivean") as DexieType;

dexie.version(1).stores({
	Blueprint: "id, [name+kind]&",
	UserBlueprint: "id, [userId+blueprintId]&",
	Item: "id, name&",
	Inventory: "id, name&",
	Slot: "id, name&",
});
