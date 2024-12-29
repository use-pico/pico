import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";
import { ItemKindSchema } from "~/app/derivean/item/ItemKindSchema";

export const ItemSchema = withRepositorySchema({
	entity: IdentitySchema.merge(
		z.object({
			name: z.string().min(1),
			kind: ItemKindSchema,
		}),
	),
	shape: z.object({
		name: z.string().min(1),
		kind: ItemKindSchema,
	}),
	filter: FilterSchema.merge(
		z.object({
			name: z.string().nullish(),
			kind: ItemKindSchema.nullish(),
		}),
	),
});

export type ItemSchema = typeof ItemSchema;
