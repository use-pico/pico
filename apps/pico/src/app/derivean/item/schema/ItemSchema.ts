import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";
import { ItemKindSchema } from "~/app/derivean/item/schema/ItemKindSchema";

export const ItemSchema = IdentitySchema.merge(
	z.object({
		name: z.string().min(1),
		kind: ItemKindSchema,
	}),
);

export type ItemSchema = typeof ItemSchema;

export namespace ItemSchema {
	export type Type = z.infer<ItemSchema>;
}
