import { queryOf } from "@use-pico/client";
import { dexie } from "~/app/derivean/dexie/dexie";
import { ItemFilterSchema } from "~/app/derivean/item/schema/ItemFilterSchema";
import { ItemSchema } from "~/app/derivean/item/schema/ItemSchema";
import { ItemShapeSchema } from "~/app/derivean/item/schema/ItemShapeSchema";

export const ItemQuery = queryOf({
	name: "ItemQuery",
	source: dexie.Item,
	schema: {
		entity: ItemSchema,
		shape: ItemShapeSchema,
		filter: ItemFilterSchema,
	},
	onFilter() {
		return true;
	},
});
