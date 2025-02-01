import { FilterSchema, withIntSchema } from "@use-pico/common";
import { z } from "zod";
import { withResourceSchema } from "~/app/derivean/db/sdk";

export const ResourceSchema = withResourceSchema({
	shape: z.object({
		name: z.string().min(1),
		weight: withIntSchema(),
		image: z.string().optional(),
		tagIds: z.array(z.string()).optional(),
	}),
	filter: FilterSchema.merge(
		z.object({
			name: z.string().optional(),
		}),
	),
});

export type ResourceSchema = typeof ResourceSchema;
