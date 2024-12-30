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
	select({ query: { where, filter } }) {
		let $select: any = db.kysely.selectFrom("Slot as slot");

		if (where?.inventoryId || filter?.inventoryId) {
			$select = $select
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
		}

		return $select;
	},
	async toCreate({ shape }) {
		return shape;
	},
});
