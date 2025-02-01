import { FilterSchema, withIntSchema } from "@use-pico/common";
import { z } from "zod";
import { withRegionSchema } from "~/app/derivean/db/sdk";

export const RegionSchema = withRegionSchema({
	shape: z.object({
		name: z.string().min(1),
		color: z.string().min(1),
		minWidth: withIntSchema(),
		maxWidth: withIntSchema(),
		minHeight: withIntSchema(),
		maxHeight: withIntSchema(),
		probability: withIntSchema(),
		limit: withIntSchema(),
		image: z.string().optional(),
	}),
	filter: FilterSchema,
});

export type RegionSchema = typeof RegionSchema;
