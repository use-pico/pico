import { withRepository } from "@use-pico/client";
import { db } from "~/app/derivean/db/db";
import { SlotSchema } from "~/app/derivean/slot/SlotSchema";

export const SlotRepository = withRepository({
	name: "SlotRepository",
	schema: SlotSchema,
	meta: {
		where: {
			id: "slot.id",
			idIn: "slot.id",
			kind: "slot.kind",
			inventoryId: "inventorySlot.inventoryId",
		},
		fulltext: ["slot.kind", "slot.name", "slot.id"],
	},
	insert() {
		return db.kysely.insertInto("Slot");
	},
	update() {
		return db.kysely.updateTable("Slot");
	},
	remove() {
		return db.kysely.deleteFrom("Slot");
	},
	select({ query: { where, filter } }) {
		let $select: any = db.kysely.selectFrom("Slot as slot");

		if (where?.inventoryId || filter?.inventoryId) {
			$select = $select.leftJoin(
				"InventorySlot as inventorySlot",
				"inventorySlot.slotId",
				"slot.id",
			);
		}

		return $select;
	},
});
