import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";
import { ItemKindSchema } from "~/app/derivean/item/ItemKindSchema";

export const SlotSchema = withRepositorySchema({
	entity: IdentitySchema.merge(
		z.object({
			name: z.string(),
			size: z.number().int().positive(),
			kind: ItemKindSchema,
		}),
	),
	shape: z.object({
		name: z.string().min(1),
		size: z.union([
			z.number().int().positive(),
			z
				.string()
				.transform((value) => parseInt(value, 10))
				.refine((value) => !isNaN(value), {
					message: "Size must be a number",
				}),
		]),
		kind: ItemKindSchema,
	}),
	filter: FilterSchema.merge(
		z.object({
			kind: ItemKindSchema.optional(),
			inventoryId: z.string().optional(),
		}),
	),
});

export type SlotSchema = typeof SlotSchema;
