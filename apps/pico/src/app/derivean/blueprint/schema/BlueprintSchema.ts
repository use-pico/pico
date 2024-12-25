import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";
import { ItemKindSchema } from "~/app/derivean/item/schema/ItemKindSchema";

export const BlueprintSchema = IdentitySchema.merge(
	z.object({
		name: z.string(),
		kind: ItemKindSchema,
	}),
);

export type BlueprintSchema = typeof BlueprintSchema;

export namespace BlueprintSchema {
	export type Type = z.infer<BlueprintSchema>;
}
