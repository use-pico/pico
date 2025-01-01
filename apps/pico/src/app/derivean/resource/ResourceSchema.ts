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
		tagIds: z.array(z.string()).optional(),
	}),
	filter: FilterSchema.merge(
		z.object({
			baseBuildingId: z.string().optional(),
		}),
	),
});

export type ResourceSchema = typeof ResourceSchema;
