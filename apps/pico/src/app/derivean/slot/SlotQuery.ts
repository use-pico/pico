import { queryOf } from "@use-pico/client";
import { dexie } from "~/app/derivean/dexie/dexie";
import { SlotFilterSchema } from "~/app/derivean/slot/schema/SlotFilterSchema";
import { SlotSchema } from "~/app/derivean/slot/schema/SlotSchema";
import { SlotShapeSchema } from "~/app/derivean/slot/schema/SlotShapeSchema";

export const SlotQuery = queryOf({
	name: "SlotQuery",
	source: dexie.Slot,
	schema: {
		entity: SlotSchema,
		shape: SlotShapeSchema,
		filter: SlotFilterSchema,
	},
	onFilter() {
		return true;
	},
});
