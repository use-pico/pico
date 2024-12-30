import { withRepository } from "@use-pico/client";
import { db } from "~/app/derivean/db/db";
import { InventorySlotSchema } from "~/app/derivean/inventory/slot/InventorySlotSchema";

export const InventorySlotRepository = withRepository({
	name: "InventorySlotRepository",
	schema: InventorySlotSchema,
	database: db,
	meta: {
		where: {
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
	async toCreate({ shape }) {
		return shape;
	},
	async toPatch({ shape }) {
		return shape;
	},
});
