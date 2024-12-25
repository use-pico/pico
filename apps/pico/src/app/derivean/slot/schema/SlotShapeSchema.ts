import { z } from "zod";
import { ItemKindSchema } from "~/app/derivean/item/schema/ItemKindSchema";

export const SlotShapeSchema = z.object({
	name: z.string().min(1),
	size: z
		.string()
		.transform((value) => parseInt(value, 10))
		.refine((value) => !isNaN(value), {
			message: "Size must be a number",
		}),
	kind: ItemKindSchema,
});

export type SlotShapeSchema = typeof SlotShapeSchema;

export namespace SlotShapeSchema {
	export type Type = z.infer<SlotShapeSchema>;
}
