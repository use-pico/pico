import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";
import { ItemKind } from "~/app/derivean/item/ItemKind";

export const SlotSchema = IdentitySchema.merge(
	z.object({
		name: z.string(),
		size: z.number(),
		kind: z.enum(ItemKind),
	}),
);

export type SlotSchema = typeof SlotSchema;

export namespace SlotSchema {
	export type Type = z.infer<SlotSchema>;
}
