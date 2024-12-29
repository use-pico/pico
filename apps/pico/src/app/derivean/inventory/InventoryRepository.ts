import { withRepository } from "@use-pico/client";
import { InventorySchema } from "~/app/derivean/inventory/InventorySchema";

export const InventoryRepository = withRepository({
	name: "InventoryRepository",
	schema: InventorySchema,
	async toCreate(shape) {
		return shape;
	},
});
