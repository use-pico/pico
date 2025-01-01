import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";
import { TagSchema } from "~/app/tag/TagSchema";

const entity = IdentitySchema.merge(
	z.object({
		name: z.string().min(1),
		description: z.string().optional(),
	}),
);

export const ResourceSchema = withRepositorySchema({
	entity,
	output: entity.merge(
		z.object({
			tagIds: z.array(z.string()),
			tags: z.array(TagSchema.output),
		}),
	),
	shape: z.object({
		name: z.string().min(1),
		description: z.string().optional(),
		tagIds: z.array(z.string()).optional(),
	}),
	filter: FilterSchema,
});

export type ResourceSchema = typeof ResourceSchema;
