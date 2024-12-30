import { withRepository } from "@use-pico/client";
import { db } from "~/app/derivean/db/db";
import { InventorySchema } from "~/app/derivean/inventory/InventorySchema";

export const InventoryRepository = withRepository({
	name: "InventoryRepository",
	schema: InventorySchema,
	database: db,
	meta: {
		where: {
			name: "inventory.name",
			slotId: "inventorySlot.slotId",
		},
	},
	insert() {
		return db.kysely.insertInto("Inventory");
	},
	select() {
		return db.kysely
			.selectFrom("Inventory as inventory")
			.leftJoin(
				"InventorySlot as inventorySlot",
				"inventorySlot.inventoryId",
				"inventory.id",
			)
			.leftJoin("Slot as slot", "inventorySlot.slotId", "slot.id");
	},
	async toCreate({ shape }) {
		return shape;
	},
});
