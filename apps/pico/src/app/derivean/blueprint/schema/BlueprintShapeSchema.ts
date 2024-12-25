import { z } from "zod";
import { ItemKindSchema } from "~/app/derivean/item/schema/ItemKindSchema";

export const BlueprintShapeSchema = z.object({
	name: z.string().min(1),
	kind: ItemKindSchema,
});

export type BlueprintShapeSchema = typeof BlueprintShapeSchema;

export namespace BlueprintShapeSchema {
	export type Type = z.infer<BlueprintShapeSchema>;
}
