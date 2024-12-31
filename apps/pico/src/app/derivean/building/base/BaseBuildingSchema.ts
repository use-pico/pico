import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";

export const BaseBuildingSchema = withRepositorySchema({
	entity: IdentitySchema.merge(
		z.object({
			name: z.string().min(1),
			description: z.string().optional(),
		}),
	),
	shape: z.object({
		name: z.string().min(1),
		description: z.string().optional(),
	}),
	filter: FilterSchema,
});

export type BaseBuildingSchema = typeof BaseBuildingSchema;
