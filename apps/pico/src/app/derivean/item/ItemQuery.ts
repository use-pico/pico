import { queryOf } from "@use-pico/client";
import { dexie } from "~/app/derivean/dexie/dexie";
import { ItemFilterSchema } from "~/app/derivean/item/schema/ItemFilterSchema";
import { ItemSchema } from "~/app/derivean/item/schema/ItemSchema";

export const ItemQuery = queryOf({
	source: dexie.Item,
	schema: {
		entity: ItemSchema,
		filter: ItemFilterSchema,
	},
	onFilter() {
		return true;
	},
});
