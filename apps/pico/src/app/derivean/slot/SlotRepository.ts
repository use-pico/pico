import { withRepository } from "@use-pico/client";
import { db } from "~/app/derivean/db/db";
import { SlotSchema } from "~/app/derivean/slot/SlotSchema";

export const SlotRepository = withRepository({
	name: "SlotRepository",
	schema: SlotSchema,
	database: db,
	meta: {
		where: {
			inventoryId: "slot.inventoryId",
			kind: "slot.kind",
		},
	},
	select() {
		return db.kysely.selectFrom("Slot");
	},
	async toCreate({ shape }) {
		return shape;
	},
});
