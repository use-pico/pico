import { queryOf } from "@use-pico/client";
import { dexie } from "~/app/derivean/dexie/dexie";
import { SlotFilterSchema } from "~/app/derivean/slot/schema/SlotFilterSchema";
import { SlotSchema } from "~/app/derivean/slot/schema/SlotSchema";

export const SlotQuery = queryOf({
	source: dexie.Slot,
	schema: {
		entity: SlotSchema,
		filter: SlotFilterSchema,
	},
	onFilter() {
		return true;
	},
});
