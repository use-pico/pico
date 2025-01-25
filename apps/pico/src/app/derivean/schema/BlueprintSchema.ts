import { FilterSchema, withIntSchema } from "@use-pico/common";
import { z } from "zod";
import { withBlueprintSchema } from "~/app/derivean/db/sdk";

export const BlueprintSchema = withBlueprintSchema({
	shape: z.object({
		name: z.string().min(1),
		cycles: withIntSchema(),
		sort: withIntSchema(),
		limit: withIntSchema(),
		regionIds: z.array(z.string()).optional(),
	}),
	filter: FilterSchema.merge(
		z.object({
			name: z.string().optional(),
		}),
	),
});

export type BlueprintSchema = typeof BlueprintSchema;
