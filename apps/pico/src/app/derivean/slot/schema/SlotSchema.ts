import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";
import { ItemKindSchema } from "~/app/derivean/item/schema/ItemKindSchema";

export const SlotSchema = IdentitySchema.merge(
	z.object({
		name: z.string(),
		size: z.number().int().positive(),
		kind: ItemKindSchema,
	}),
);

export type SlotSchema = typeof SlotSchema;

export namespace SlotSchema {
	export type Type = z.infer<SlotSchema>;
}
