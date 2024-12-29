import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";

export const InventorySchema = withRepositorySchema({
	entity: IdentitySchema.merge(
		z.object({
			name: z.string().min(1),
		}),
	),
	shape: z.object({
		name: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			name: z.string().optional(),
		}),
	),
});

export type InventorySchema = typeof InventorySchema;
