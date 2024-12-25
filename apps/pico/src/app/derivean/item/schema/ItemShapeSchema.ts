import { z } from "zod";
import { ItemKindSchema } from "~/app/derivean/item/schema/ItemKindSchema";

export const ItemShapeSchema = z.object({
	name: z.string().min(1),
	kind: ItemKindSchema,
});

export type ItemShapeSchema = typeof ItemShapeSchema;

export namespace ItemShapeSchema {
	export type Type = z.infer<ItemShapeSchema>;
}
