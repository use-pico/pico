import { withRepository } from "@use-pico/client";
import { InventorySlotSchema } from "~/app/derivean/inventory/slot/InventorySlotSchema";

export const InventorySlotRepository = withRepository({
	name: "InventorySlotRepository",
	schema: InventorySlotSchema,
	async toCreate(shape) {
		return shape;
	},
});
