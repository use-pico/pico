import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const SlotFilterSchema = FilterSchema.merge(
	z.object({
		//
	}),
);

export type SlotFilterSchema = typeof SlotFilterSchema;

export namespace SlotFilterSchema {
	export type Type = z.infer<SlotFilterSchema>;
}
