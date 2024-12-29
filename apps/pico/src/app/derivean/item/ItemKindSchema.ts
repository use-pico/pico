import { z } from "zod";
import { ItemKind } from "~/app/derivean/item/ItemKind";

export const ItemKindSchema = z.enum(ItemKind);

export type ItemKindSchema = typeof ItemKindSchema;

export namespace ItemKindSchema {
	export type Type = z.infer<ItemKindSchema>;
}
