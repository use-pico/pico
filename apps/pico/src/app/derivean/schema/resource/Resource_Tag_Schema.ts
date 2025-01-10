import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withResourceTagSchema } from "~/app/derivean/db/sdk";

export const Resource_Tag_Schema = withResourceTagSchema({
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

export type Resource_Tag_Schema = typeof Resource_Tag_Schema;
