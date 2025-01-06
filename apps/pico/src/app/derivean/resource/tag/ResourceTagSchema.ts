import {
    FilterSchema,
    IdentitySchema,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";

export const ResourceTagSchema = withSourceSchema({
	entity: IdentitySchema.merge(
		z.object({
			resourceId: z.string().min(1),
			tagId: z.string().min(1),
		}),
	),
	shape: z.object({
		resourceId: z.string().min(1),
		tagId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			resourceId: z.string().optional(),
			tagId: z.string().optional(),
		}),
	),
	sort: ["name", "sort"],
});

export type ResourceTagSchema = typeof ResourceTagSchema;
