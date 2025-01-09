import {
    FilterSchema,
    withFloatSchema,
    withIntSchema
} from "@use-pico/common";
import { z } from "zod";
import { withResourceProductionSchema } from "~/app/derivean/db/sdk";

export const ResourceProductionSchema = withResourceProductionSchema({
	shape: z.object({
		resourceId: z.string().min(1),
		amount: withFloatSchema(),
		cycles: withIntSchema(),
		limit: withIntSchema(),
		level: withIntSchema(),
	}),
	filter: FilterSchema.merge(
		z.object({
			resourceId: z.string().optional(),
		}),
	),
});

export type ResourceProductionSchema = typeof ResourceProductionSchema;
