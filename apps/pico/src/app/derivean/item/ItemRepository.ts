import { withRepository } from "@use-pico/client";
import { ItemSchema } from "~/app/derivean/item/ItemSchema";

export const ItemRepository = withRepository({
	name: "ItemRepository",
	schema: ItemSchema,
	async toCreate(shape) {
		return shape;
	},
});
