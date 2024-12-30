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
		},
	},
	select() {
		return db.kysely.selectFrom("Inventory");
	},
	async toCreate({ shape }) {
		return shape;
	},
});
