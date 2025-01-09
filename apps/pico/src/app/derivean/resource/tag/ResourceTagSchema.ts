import {
    FilterSchema
} from "@use-pico/common";
import { z } from "zod";
import { withResourceTagSchema } from "~/app/derivean/db/sdk";

export const ResourceTagSchema = withResourceTagSchema({
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
});

export type ResourceTagSchema = typeof ResourceTagSchema;
