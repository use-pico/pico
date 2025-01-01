import { withRepository } from "@use-pico/client";
import { db } from "~/app/derivean/db/db";
import { InventorySlotSchema } from "~/app/derivean/inventory/slot/InventorySlotSchema";

export const InventorySlotRepository = withRepository({
	name: "InventorySlotRepository",
	schema: InventorySlotSchema,
	meta: {
		where: {
			id: "inventorySlot.id",
			idIn: "inventorySlot.id",
			inventoryId: "inventorySlot.inventoryId",
			slotId: "inventorySlot.slotId",
		},
	},
	insert() {
		return db.kysely.insertInto("InventorySlot");
	},
	update() {
		return db.kysely.updateTable("InventorySlot");
	},
	remove() {
		return db.kysely.deleteFrom("InventorySlot");
	},
	select() {
		return db.kysely.selectFrom("InventorySlot as inventorySlot");
	},
});
