import { withRepository } from "@use-pico/client";
import { db } from "~/app/derivean/db/db";
import { ItemSchema } from "~/app/derivean/item/ItemSchema";

export const ItemRepository = withRepository({
	name: "ItemRepository",
	schema: ItemSchema,
	database: db,
	meta: {
		where: {
			kind: "item.kind",
			name: "item.name",
		},
	},
	insert() {
		return db.kysely.insertInto("Item");
	},
	select() {
		return db.kysely.selectFrom("Item as item");
	},
	async toCreate({ shape }) {
		return shape;
	},
});
