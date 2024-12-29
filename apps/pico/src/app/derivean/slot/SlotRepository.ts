import { withRepository } from "@use-pico/client";
import { SlotSchema } from "~/app/derivean/slot/SlotSchema";

export const SlotRepository = withRepository({
	name: "SlotRepository",
	schema: SlotSchema,
	async toCreate(shape) {
		return shape;
	},
});
