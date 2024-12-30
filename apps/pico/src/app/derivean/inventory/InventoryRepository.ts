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
	update() {
		return db.kysely.updateTable("Inventory");
	},
	select({ query: { where, filter } }) {
		const $select = db.kysely.selectFrom("Inventory as inventory");

		if (where?.slotId || filter?.slotId) {
			return $select.leftJoin(
				"InventorySlot as inventorySlot",
				"inventorySlot.inventoryId",
				"inventory.id",
			);
		}

		return $select;
	},
	async toCreate({ shape }) {
		return shape;
	},
	async toPatch({ shape }) {
		return shape;
	},
});
