import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { ItemKindSchema } from "~/app/derivean/item/schema/ItemKindSchema";

export const SlotFilterSchema = FilterSchema.merge(
	z.object({
		kind: ItemKindSchema.nullish(),
	}),
);

export type SlotFilterSchema = typeof SlotFilterSchema;

export namespace SlotFilterSchema {
	export type Type = z.infer<SlotFilterSchema>;
}
