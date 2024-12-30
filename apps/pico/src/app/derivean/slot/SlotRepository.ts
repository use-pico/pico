import { withRepository } from "@use-pico/client";
import { db } from "~/app/derivean/db/db";
import { SlotSchema } from "~/app/derivean/slot/SlotSchema";

export const SlotRepository = withRepository({
	name: "SlotRepository",
	schema: SlotSchema,
	database: db,
	meta: {
		where: {
			kind: "slot.kind",
			inventoryId: "inventorySlot.inventoryId",
		},
	},
	insert() {
		return db.kysely.insertInto("Slot");
	},
	select() {
		return db.kysely
			.selectFrom("Slot as slot")
			.leftJoin(
				"InventorySlot as inventorySlot",
				"inventorySlot.slotId",
				"slot.id",
			)
			.leftJoin(
				"Inventory as inventory",
				"inventorySlot.inventoryId",
				"inventory.id",
			);
	},
	async toCreate({ shape }) {
		return shape;
	},
});
